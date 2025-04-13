# ClauseGuard

ClauseGuard is a legal AI assistant that helps with legal research and contract analysis.

## Architecture

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Python (FastAPI)
- **Database/Auth**: Supabase (PostgreSQL)
- **Deployment**: Vercel (Frontend), Render (Backend)

## Project Structure

```
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
```

## Local Development

### Frontend

```bash
cd frontend
python -m http.server 8000
```

Visit `http://localhost:8000` in your browser.

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

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

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_api_key
```

## License

MIT
