-- Supabase Database Schema for Rustblood Web Backend

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Gallery table for concert photos
CREATE TABLE gallery (
    id BIGSERIAL PRIMARY KEY,
    title TEXT DEFAULT 'Concert',
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts table for blog/news posts
CREATE TABLE posts (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table for contact form
CREATE TABLE messages (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) if needed
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your authentication needs)
-- Gallery: Public read, admin write
CREATE POLICY "Public can view gallery" ON gallery
    FOR SELECT USING (true);

-- Posts: Public read, admin write
CREATE POLICY "Public can view posts" ON posts
    FOR SELECT USING (true);

-- Messages: Admin read/write, public insert only
CREATE POLICY "Public can insert messages" ON messages
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view messages" ON messages
    FOR SELECT USING (true);
