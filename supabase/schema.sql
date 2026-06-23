-- Run this script in the Supabase SQL Editor to create the necessary tables.

-- 1. Create the 'site_settings' table
CREATE TABLE IF NOT EXISTS site_settings (
  id integer PRIMARY KEY DEFAULT 1,
  is_locked boolean DEFAULT true,
  unlock_time timestamp with time zone DEFAULT '2026-12-31T23:59:59Z',
  updated_at timestamp with time zone DEFAULT now()
);

-- Insert the default settings row (id = 1)
INSERT INTO site_settings (id, is_locked) 
VALUES (1, true)
ON CONFLICT (id) DO NOTHING;

-- 2. Create the 'wishes' table for Guestbook and Video Wishes
CREATE TABLE IF NOT EXISTS wishes (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  message text NOT NULL,
  video_url text,
  status text DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at timestamp with time zone DEFAULT now()
);

-- 3. Set up Storage for video uploads
-- Note: You might need to manually create the "uploads" bucket in the Supabase Storage UI
-- and set it to "Public".
INSERT INTO storage.buckets (id, name, public) 
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies to allow public uploads and reads
-- Allow public to read from the uploads bucket
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'uploads' );

-- Allow public to insert into the uploads bucket
CREATE POLICY "Public Upload" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'uploads' );
