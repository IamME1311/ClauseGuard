-- Enable the necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.precedents (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    court TEXT NOT NULL,
    year INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_searches (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_contracts (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT,
    content TEXT NOT NULL,
    risk_score INTEGER,
    analysis JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.precedents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_contracts ENABLE ROW LEVEL SECURITY;

-- Users can only see and modify their own data
CREATE POLICY "Users can view their own data" ON public.users
    FOR SELECT USING (auth.uid() = id);

-- Precedents are readable by all authenticated users
CREATE POLICY "Precedents are readable by authenticated users" ON public.precedents
    FOR SELECT USING (auth.role() = 'authenticated');

-- Users can only see and modify their own searches
CREATE POLICY "Users can view their own searches" ON public.user_searches
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own searches" ON public.user_searches
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only see and modify their own contracts
CREATE POLICY "Users can view their own contracts" ON public.user_contracts
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own contracts" ON public.user_contracts
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own contracts" ON public.user_contracts
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own contracts" ON public.user_contracts
    FOR DELETE USING (auth.uid() = user_id);

-- Insert sample precedent data
INSERT INTO public.precedents (title, summary, court, year, content)
VALUES 
    ('hiQ Labs v. LinkedIn', 'Court ruled that scraping publicly available data from websites does not violate the CFAA.', '9th Circuit', 2019, 'Full case text here...'),
    ('Van Buren v. United States', 'Supreme Court narrowed the interpretation of ''exceeding authorized access'' under the CFAA.', 'Supreme Court', 2021, 'Full case text here...'),
    ('Oracle v. Google', 'Supreme Court ruled that Google''s copying of Java API was fair use.', 'Supreme Court', 2021, 'Full case text here...');
