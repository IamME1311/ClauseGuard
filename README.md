# ClauseGuard

<<<<<<< HEAD
ClauseGuard is a legal AI assistant that helps with legal research and contract analysis.

## Architecture

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Python (FastAPI)
- **Database/Auth**: Supabase (PostgreSQL)
- **Deployment**: Vercel (Frontend), Render (Backend)

## Project Structure

<<<<<<< HEAD
```
=======
\`\`\`
>>>>>>> 8e8db04 (chore: Add core files with dependency fixes)
clauseguard/
├── frontend/                  # Pure HTML/CSS/JS
│   ├── index.html             # Landing page
│   ├── auth/
│   │   ├── login.html         # Auth pages
│   │   └── signup.html
│   ├── dashboard/
│   │   ├── index.html         # Tool selector
│   │   ├── legal-research.html
│   │   └── contract-analysis.html
│   ├── css/
│   │   ├── styles.css         # Global styles
│   │   └── components/        # Modular CSS
│   └── js/
│       ├── auth.js            # Auth handlers
│       ├── api.js             # Fetch wrapper
│       └── components/        # UI logic
├── backend/                   # FastAPI
│   ├── main.py                # API routes
│   └── requirements.txt
└── supabase/                  # SQL migrations
    └── setup.sql
<<<<<<< HEAD
```
=======
\`\`\`
>>>>>>> 8e8db04 (chore: Add core files with dependency fixes)

## Local Development

### Frontend

<<<<<<< HEAD
```bash
cd frontend
python -m http.server 8000
```
=======
\`\`\`bash
cd frontend
python -m http.server 8000
\`\`\`
>>>>>>> 8e8db04 (chore: Add core files with dependency fixes)

Visit `http://localhost:8000` in your browser.

### Backend

<<<<<<< HEAD
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
=======
\`\`\`bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
\`\`\`
>>>>>>> 8e8db04 (chore: Add core files with dependency fixes)

The API will be available at `http://localhost:8000`.

## Deployment

### Supabase Setup

1. Create a new Supabase project
2. Run the SQL in `supabase/setup.sql` in the SQL Editor
3. Get your Supabase URL and API key from the project settings

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the build command: `pip install -r requirements.txt`
4. Set the start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables:
   - `SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_KEY`: Your Supabase API key

### Frontend Deployment (Vercel)

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set the root directory to `frontend`
4. Deploy

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

<<<<<<< HEAD
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_api_key
```
=======
\`\`\`
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_api_key
\`\`\`
>>>>>>> 8e8db04 (chore: Add core files with dependency fixes)

## License

MIT
=======
ClauseGuard is an AI-powered legal contract analysis tool that helps legal professionals and businesses analyze contracts faster and more accurately.

## Features

- **Contract Analysis**: Extract key clauses, identify risks, and get summaries of legal documents
- **Legal Research**: Research legal topics and precedents using LlamaIndex and OpenAI
- **User Authentication**: Secure authentication using Supabase magic links
- **Dark Mode Support**: Toggle between light and dark themes
- **File Processing**: Supports PDF, DOCX, and image-based contracts (via OCR)

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: FastAPI (Python)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **UI Components**: shadcn/ui
- **AI Research**: LlamaIndex, OpenAI

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+ (for FastAPI backend)
- Supabase account
- OpenAI API key (for LlamaIndex integration)

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

### Frontend Setup

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
1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set the root directory to frontend
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
```

### License
MIT



>>>>>>> 2989183 (chore: Initial commit with line ending normalization)
