# ClauseGuard - AI-Powered Legal Contract Analysis

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ClauseGuard is an AI-powered legal assistant that helps professionals analyze contracts, identify risks, and research legal precedents using cutting-edge AI technologies.

## Features

- **Contract Analysis** - Extract key clauses and identify potential risks
- **Legal Research** - Query legal databases using natural language
- **Secure Authentication** - Magic link authentication via Supabase
- **Multi-Format Support** - PDF, DOCX, and image-based contracts (OCR)
- **Dark Mode** - Built-in theme toggle

## Tech Stack

**Frontend**  
Next.js 14 | React 18 | TypeScript | Tailwind CSS | shadcn/ui  

**Backend**  
Python | FastAPI | Supabase (PostgreSQL) | LlamaIndex | OpenAI  

**Tools**  
Vercel | Render | PDF.js | Tesseract.js  

## Project Structure
```text

```clauseguard/
├── frontend/ # Pure HTML/CSS/JS
│ ├── index.html # Landing page
│ ├── auth/
│ │ ├── login.html # Auth pages
│ │ └── signup.html
│ ├── dashboard/
│ │ ├── index.html # Tool selector
│ │ ├── legal-research.html
│ │ └── contract-analysis.html
│ ├── css/
│ │ ├── styles.css # Global styles
│ │ └── components/ # Modular CSS
│ └── js/
│ ├── auth.js # Auth handlers
│ ├── api.js # Fetch wrapper
│ └── components/ # UI logic
├── backend/ # FastAPI
│ ├── main.py # API routes
│ └── requirements.txt
└── supabase/ # SQL migrations
└── setup.sql



## Getting Started

### Prerequisites
- Node.js 18.x+
- Python 3.9+
- Supabase account
- OpenAI API key

### Installation

**Frontend:**

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

### Backend Setup

1. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Run the FastAPI server:
```bash
python main.py
```
###  Database Setup

1. Create a new database in Supabase
2. Run the SQL in supabase/setup.sql in the SQL Editor
3. Get your Supabase URL and API key from the project settings

### Backend Deployment (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the build command: pip install -r requirements.txt
4. Set the start command: uvicorn main:app --host 0.0.0.0 --port $PORT
5. Add environment variables:
             SUPABASE_URL: Your Supabase URL
             SUPABASE_KEY: Your Supabase API key
             OPENAI_API_KEY: Your OpenAI API key


### Frontend Deployment (Vercel)
1. Import Git repository
2. Set root directory to /frontend
3. Add environment variables:
             NEXT_PUBLIC_SUPABASE_URL
             NEXT_PUBLIC_SUPABASE_KEY
4. Deploy

### Docker Setup

1. Build the Docker image:
```bash
docker-compose build
```

2. Run the Docker containers:
```bash
docker-compose up
```

3. Access the application:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

### Docker Deployment

1. Build the Docker image:
```bash
docker-compose build
```

2. Run the Docker containers:
```bash
docker-compose up
```

3. Access the application:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

### Environment Variables

Create a `.env.local` file with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# FastAPI
NEXT_PUBLIC_FASTAPI_URL=http://localhost:8000

# OpenAI
OPENAI_API_KEY=your-openai-api-key






