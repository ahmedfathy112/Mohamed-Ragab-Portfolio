-- Project Management Dashboard - Database Setup
-- Run this SQL in your Supabase SQL Editor to create the necessary tables and policies

-- ============================================================================
-- Create Projects Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  github_url VARCHAR(255),
  linkedin_url VARCHAR(255),
  skills TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- ============================================================================
-- Enable Row Level Security (RLS)
-- ============================================================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Create RLS Policies for Public Access
-- ============================================================================

-- Policy: Allow anyone to read all projects
CREATE POLICY "Allow public read access"
  ON projects
  FOR SELECT
  USING (true);

-- Policy: Allow anyone to insert projects
CREATE POLICY "Allow public insert"
  ON projects
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow anyone to update projects
CREATE POLICY "Allow public update"
  ON projects
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Policy: Allow anyone to delete projects
CREATE POLICY "Allow public delete"
  ON projects
  FOR DELETE
  USING (true);

-- ============================================================================
-- Create Project Images Storage Bucket (via SQL)
-- ============================================================================
-- Note: Storage buckets are created via the dashboard, but you can run this
-- to set up the bucket if it doesn't exist:

INSERT INTO storage.buckets (id, name, public)
VALUES ('projects', 'projects', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Storage Policies for Public Access
-- ============================================================================

-- Policy: Allow public read access to project images
CREATE POLICY "Allow public read"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'projects');

-- Policy: Allow public uploads to project images bucket
CREATE POLICY "Allow public upload"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'projects');

-- Policy: Allow public delete from project images bucket
CREATE POLICY "Allow public delete"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'projects');

-- ============================================================================
-- Sample Data (Optional)
-- ============================================================================
-- Uncomment this section to add sample projects for testing

/*
INSERT INTO projects (title, description, github_url, linkedin_url, skills, image_url)
VALUES
  (
    'Portfolio Site',
    'A modern portfolio website built with React and Tailwind CSS',
    'https://github.com/example/portfolio',
    'https://linkedin.com/feed/update/urn:li:activity:123456',
    ARRAY['React', 'Tailwind CSS', 'TypeScript'],
    'https://example.com/portfolio.jpg'
  ),
  (
    'Task Manager App',
    'Full-stack task management application with real-time updates',
    'https://github.com/example/task-manager',
    'https://linkedin.com/feed/update/urn:li:activity:123457',
    ARRAY['React', 'Node.js', 'MongoDB', 'WebSocket'],
    'https://example.com/task-manager.jpg'
  );
*/

-- ============================================================================
-- Verification Queries
-- ============================================================================
-- Run these queries to verify your setup:

-- Check if projects table exists and has correct columns:
-- SELECT * FROM information_schema.columns WHERE table_name = 'projects';

-- Check if RLS policies are enabled:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'projects';

-- Check if storage bucket exists:
-- SELECT * FROM storage.buckets WHERE name = 'projects';

-- Get all projects:
-- SELECT * FROM projects ORDER BY created_at DESC;
