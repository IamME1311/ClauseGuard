from fastapi import FastAPI, Depends, HTTPException, status, Request, BackgroundTasks
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

# Load environment variables only once
load_dotenv()

# Import LlamaIndex components
try:
    from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
    from llama_index.core.agent.workflow import FunctionAgent
    from llama_index.llms.openai import OpenAI
    HAS_LLAMA_INDEX = True
except ImportError:
    print("Warning: LlamaIndex not available. Legal research functionality will be limited.")
    HAS_LLAMA_INDEX = False

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

class ContractRequest(BaseModel):
    contract_text: str


# Auth endpoints
@app.post("/api/auth/signup", response_model=Token)
async def signup(user: User):
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
async def login(user: User):
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
async def analyze_contract(request: ContractRequest):
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
