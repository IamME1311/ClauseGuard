from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List, Optional
import os
import httpx
from dotenv import load_dotenv

# Load environment variables
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
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Models
class User(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class PrecedentSearch(BaseModel):
    query: str

class Precedent(BaseModel):
    id: int
    title: str
    summary: str
    court: str
    year: int
    relevance: float

# Supabase client helper
async def supabase_request(endpoint: str, method: str = "GET", data: dict = None):
    url = f"{SUPABASE_URL}{endpoint}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    }
    
    async with httpx.AsyncClient() as client:
        if method == "GET":
            response = await client.get(url, headers=headers)
        elif method == "POST":
            response = await client.post(url, headers=headers, json=data)
        
        if response.status_code >= 400:
            raise HTTPException(
                status_code=response.status_code,
                detail=response.text
            )
        
        return response.json()

# Auth endpoints
@app.post("/api/auth/signup", response_model=Token)
async def signup(user: User):
    try:
        # Call Supabase auth signup
        data = {
            "email": user.email,
            "password": user.password
        }
        result = await supabase_request("/auth/v1/signup", "POST", data)
        
        return {
            "access_token": result.get("access_token", ""),
            "token_type": "bearer"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@app.post("/api/auth/login", response_model=Token)
async def login(user: User):
    try:
        # Call Supabase auth login
        data = {
            "email": user.email,
            "password": user.password
        }
        result = await supabase_request("/auth/v1/token?grant_type=password", "POST", data)
        
        return {
            "access_token": result.get("access_token", ""),
            "token_type": "bearer"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

# Legal research endpoints
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

@app.post("/api/contract-analysis")
async def analyze_contract(contract_text: str):
    # Mock contract analysis
    return {
        "risk_score": 65,
        "issues": [
            {"clause": "Section 8.2", "issue": "Ambiguous liability terms", "severity": "high"},
            {"clause": "Section 12.1", "issue": "Non-standard confidentiality period", "severity": "medium"}
        ],
        "recommendations": [
            "Clarify liability limitations in Section 8.2",
            "Review confidentiality terms against industry standards"
        ]
    }

# Run the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
