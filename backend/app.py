from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
import httpx
import json
from supabase import create_client, Client

app = FastAPI(title="ClauseGuard API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase configuration
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

# Initialize Supabase client
supabase: Client = create_client(supabase_url, supabase_key)

# Models
class SearchQuery(BaseModel):
    query: str

class ContractAnalysisRequest(BaseModel):
    text: str

class ContractAnalysisResponse(BaseModel):
    risk_score: int
    issues: List[Dict[str, Any]]
    recommendations: List[str]

# Authentication dependency
async def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
        # Extract JWT token
        token = authorization.split("Bearer ")[1]
        
        # Verify token with Supabase
        response = supabase.auth.get_user(token)
        user = response.user
        
        if not user:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        return user
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Authentication error: {str(e)}")

# Routes
@app.get("/")
async def root():
    return {"message": "Welcome to ClauseGuard API"}

@app.post("/api/search")
async def search_precedents(query: SearchQuery, user = Depends(get_current_user)):
    try:
        # Save search to database
        supabase.table("user_searches").insert({
            "user_id": user.id,
            "query": query.query
        }).execute()
        
        # Get precedents from database
        response = supabase.table("precedents").select("*").execute()
        precedents = response.data
        
        # Simple search implementation (in production, use full-text search)
        results = []
        for precedent in precedents:
            searchable_text = f"{precedent['title']} {precedent['summary']} {precedent['content']}".lower()
            if query.query.lower() in searchable_text:
                # Calculate a simple relevance score
                title_match = query.query.lower() in precedent['title'].lower()
                summary_match = query.query.lower() in precedent['summary'].lower()
                
                # Higher score for title and summary matches
                relevance = 0.5
                if title_match:
                    relevance += 0.3
                if summary_match:
                    relevance += 0.2
                
                precedent["relevance"] = relevance
                results.append(precedent)
        
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching precedents: {str(e)}")

@app.post("/api/analyze-contract", response_model=ContractAnalysisResponse)
async def analyze_contract(request: ContractAnalysisRequest, user = Depends(get_current_user)):
    try:
        # In a real implementation, we would use NLP to analyze the contract
        # For now, we'll return mock data
        
        # Mock analysis
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
        
        # Save analysis to database
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
