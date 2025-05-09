from fastapi import FastAPI, Depends, HTTPException, status, Request, BackgroundTasks, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import os
import re
import uvicorn
import json
import asyncio
from dotenv import load_dotenv
from .Agent.agent import ClauseGuard_Agent
from .agent_dummy import analyze_contract_text, analyze_contract_file

# Load environment variables only once
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="ClauseGuard API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase configuration
from supabase import create_client, Client

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("Supabase configuration missing. Set SUPABASE_URL and SUPABASE_KEY in your environment.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ------------------
# Data Models
# ------------------
from datetime import datetime

class Token(BaseModel):
    """Authentication token response."""
    access_token: str
    token_type: str

class UserSignup(BaseModel):
    """User signup request."""
    email: str
    password: str

class UserLogin(UserSignup):
    """User login request (same fields as signup)."""
    pass

class UserProfile(BaseModel):
    """User profile for frontend display/editing."""
    id: Optional[str]
    email: str
    name: Optional[str] = None
    avatar: Optional[str] = None
    created_at: Optional[datetime] = None

class SearchQuery(BaseModel):
    query: str

class ContractRequest(BaseModel):
    contract_text: str

class ContractAnalysisRequest(BaseModel):
    text: str

class ContractAnalysisResponse(BaseModel):
    risk_score: int
    issues: List[Dict[str, Any]]
    recommendations: List[str]

class UserContract(BaseModel):
    id: Optional[str]
    user_id: str
    title: str
    content: str
    risk_score: int
    analysis: str
    created_at: Optional[datetime] = None

class Precedent(BaseModel):
    id: int
    title: str
    summary: str
    court: str
    year: int
    relevance: float


# Authentication dependency
async def get_current_user(authorization: Optional[str] = None):
    from fastapi import Header
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        token = authorization.split("Bearer ")[1]
        response = supabase.auth.get_user(token)
        user = response.user
        if not user:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Authentication error: {str(e)}")

# Auth endpoints
@app.post("/api/auth/signup", response_model=Token)
async def signup(user: User): # TODO : add User datamodel
    try:
        # Call Supabase auth signup
        response = supabase.auth.sign_up({"email": user.email, "password": user.password})
        session = response.session
        access_token = session.access_token if session else ""
        return {
            "access_token": access_token,
            "token_type": "bearer"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@app.post("/api/auth/login", response_model=Token)
async def login(user: User): # TODO : add User datamodel
    try:
        # Call Supabase auth login
        response = supabase.auth.sign_in_with_password({"email": user.email, "password": user.password})
        session = response.session
        access_token = session.access_token if session else ""
        return {
            "access_token": access_token,
            "token_type": "bearer"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

# Legal research endpoints

@app.post("/api/legal-research")
async def legal_research_api(payload: dict):
    import logging
    query:str = payload.get("query", "")
    logging.info(f"Received legal research request: {query}")
    try:
        if not query:
            raise ValueError("Query is required.")
        Agent_obj = ClauseGuard_Agent()
        result = await Agent_obj.agent_execute(query)
        return result
    except Exception as e:
        logging.exception("Error in legal research")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analyze-contract", response_model=ContractAnalysisResponse)
async def analyze_contract(request: ContractAnalysisRequest, user = Depends(get_current_user)):
    try:
        analysis = {
            "risk_score": 65,
            "issues": [
                {
                    "clause": "Termination (Section 7)",
                    "severity": "high",
                    "issue": "The termination clause allows either party to terminate with only 30 days notice, which may not provide sufficient time to transition services."
                },
                {
                    "clause": "Limitation of Liability (Section 6)",
                    "severity": "medium",
                    "issue": "The limitation of liability clause excludes all indirect damages, which may limit your ability to recover certain types of losses."
                },
                {
                    "clause": "Intellectual Property (Section 5)",
                    "severity": "low",
                    "issue": "The intellectual property clause grants all rights to the Company, which may be broader than necessary."
                }
            ],
            "recommendations": [
                "Negotiate a longer notice period for termination, such as 60 or 90 days.",
                "Modify the limitation of liability clause to allow for recovery of certain indirect damages.",
                "Consider narrowing the intellectual property assignment to only work product directly related to the services."
            ]
        }
        supabase.table("user_contracts").insert({
            "user_id": user.id,
            "title": "Contract Analysis",
            "content": request.text[:100] + "...",
            "risk_score": analysis["risk_score"],
            "analysis": json.dumps(analysis)
        }).execute()
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing contract: {str(e)}")

@app.get("/api/user/searches")
async def get_user_searches(user = Depends(get_current_user)):
    try:
        response = supabase.table("user_searches").select("*").eq("user_id", user.id).order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting user searches: {str(e)}")

@app.get("/api/user/contracts")
async def get_user_contracts(user = Depends(get_current_user)):
    try:
        response = supabase.table("user_contracts").select("*").eq("user_id", user.id).order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting user contracts: {str(e)}")

@app.get("/api/precedents", response_model=List[Precedent])
async def search_precedents(q: str):
    # For now, return mock data
    # In production, this would query Supabase
    return [
        {
            "id": 1, 
            "title": "hiQ Labs v. LinkedIn", 
            "summary": "Court ruled that scraping publicly available data from websites does not violate the CFAA.",
            "court": "9th Circuit",
            "year": 2019,
            "relevance": 0.95
        },
        {
            "id": 2, 
            "title": "Van Buren v. United States", 
            "summary": "Supreme Court narrowed the interpretation of 'exceeding authorized access' under the CFAA.",
            "court": "Supreme Court",
            "year": 2021,
            "relevance": 0.87
        },
        {
            "id": 3, 
            "title": "Oracle v. Google", 
            "summary": "Supreme Court ruled that Google's copying of Java API was fair use.",
            "court": "Supreme Court",
            "year": 2021,
            "relevance": 0.72
        }
    ]

@app.post("/api/contract-intelligence")
async def contract_intelligence(request: ContractRequest):
    import logging
    logging.info("Received contract intelligence request (text length=%d)", len(request.contract_text))
    try:
        result = await analyze_contract_text(request.contract_text)
        return result
    except Exception as e:
        logging.exception("Error analyzing contract text")
        raise HTTPException(status_code=500, detail=f"Error analyzing contract: {str(e)}")

@app.post("/api/contract-intelligence/upload")
async def contract_intelligence_upload(file: UploadFile = File(...)):
    import logging
    logging.info(f"Received contract file upload: {file.filename}")
    try:
        # Save file temporarily
        temp_path = f"/tmp/{file.filename}"
        with open(temp_path, "wb") as buffer:
            buffer.write(await file.read())
        result = await analyze_contract_file(temp_path)
        os.remove(temp_path)
        return result
    except Exception as e:
        logging.exception("Error analyzing uploaded contract file")
        raise HTTPException(status_code=500, detail=f"Error analyzing contract file: {str(e)}")

# User Profile Endpoints
@app.get("/api/user/profile", response_model=UserProfile)
async def get_user_profile(user=Depends(get_current_user)):
    try:
        # Fetch from user_profiles table
        response = supabase.table("user_profiles").select("id,email,name,avatar,created_at").eq("id", user.id).single().execute()
        if response.data:
            return response.data
        # Fallback: return basic info from Supabase user if no profile row
        return {
            "id": user.id,
            "email": user.email,
            "name": None,
            "avatar": None,
            "created_at": user.created_at if hasattr(user, "created_at") else None,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching profile: {str(e)}")

@app.post("/api/user/profile", response_model=UserProfile)
async def update_user_profile(payload: UserProfile, user=Depends(get_current_user)):
    try:
        # Upsert profile (update if exists, insert if not)
        update_fields = {"name": payload.name, "avatar": payload.avatar}
        upsert_data = {"id": user.id, "email": user.email, **update_fields}
        response = supabase.table("user_profiles").upsert(upsert_data, on_conflict="id").execute()
        if response.data and len(response.data) > 0:
            return response.data[0]
        # Fallback: return what we tried to set
        return {"id": user.id, "email": user.email, **update_fields, "created_at": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating profile: {str(e)}")

# Run the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
