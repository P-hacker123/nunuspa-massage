-- ============================================
-- Nunu Spa Database Schema
-- Supabase PostgreSQL Setup
-- ============================================

-- ============================================
-- 1. BOOKINGS TABLE
-- ============================================

CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  service_type TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow public to insert bookings (for booking form)
CREATE POLICY "Allow public to insert bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

-- Allow authenticated users to view all bookings
CREATE POLICY "Allow authenticated users to view bookings"
  ON bookings FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow authenticated users to update bookings
CREATE POLICY "Allow authenticated users to update bookings"
  ON bookings FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete bookings
CREATE POLICY "Allow authenticated users to delete bookings"
  ON bookings FOR DELETE
  USING (auth.role() = 'authenticated');


-- ============================================
-- 2. MESSAGES TABLE
-- ============================================

CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow public to insert messages
CREATE POLICY "Allow public to insert messages"
  ON messages FOR INSERT
  WITH CHECK (true);

-- Allow authenticated users to view all messages
CREATE POLICY "Allow authenticated users to view messages"
  ON messages FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow authenticated users to update messages
CREATE POLICY "Allow authenticated users to update messages"
  ON messages FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete messages
CREATE POLICY "Allow authenticated users to delete messages"
  ON messages FOR DELETE
  USING (auth.role() = 'authenticated');


-- ============================================
-- 3. SETTINGS TABLE
-- ============================================

CREATE TABLE settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL,
  maps_embed_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Allow public to read settings
CREATE POLICY "Allow public to read settings"
  ON settings FOR SELECT
  USING (true);

-- Allow authenticated users to update settings
CREATE POLICY "Allow authenticated users to update settings"
  ON settings FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert default settings
INSERT INTO settings (phone_number, maps_embed_url) VALUES
('+250 787 891 778', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5198629928!2d30.0622!3d-1.9536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTcnMTMuMCJTIDMwwrAwMycxOS45IkU!5e0!3m2!1sen!2srw!4v1234567890');



-- ============================================
-- 4. SERVICES TABLE
-- ============================================

CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  duration TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Allow public to read services
CREATE POLICY "Allow public to read services"
  ON services FOR SELECT
  USING (true);

-- Allow authenticated users to manage services
CREATE POLICY "Allow authenticated users to manage services"
  ON services FOR ALL
  USING (auth.role() = 'authenticated');


-- ============================================
-- SCHEMA COMPLETE
-- ============================================
-- 
-- Next Steps:
-- 1. Copy this entire file
-- 2. Go to Supabase Dashboard → SQL Editor
-- 3. Paste and run this SQL
-- 4. Create an admin user in Authentication → Users
-- 5. Copy your API keys to .env.local
-- 
-- ============================================
