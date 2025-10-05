-- ====================================================================
-- 100_fresh_schema_rebuild.sql
-- Shanvik Catering & Event Management
-- Fresh Supabase Schema Rebuild
-- Author: Thanush Kannan | Last Updated: 2025-10-05
-- ====================================================================

-- Drop existing tables (for clean rebuild)
DROP TABLE IF EXISTS plan_your_event_submissions CASCADE;
DROP TABLE IF EXISTS site_content CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS gallery_images CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- ====================================================================
-- TABLE: admin_users
-- ====================================================================
CREATE TABLE admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- ====================================================================
-- TABLE: gallery_images
-- ====================================================================
CREATE TABLE gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  alt_text text,
  image_url text NOT NULL,
  category text CHECK (category IN ('Wedding', 'Corporate', 'Private', 'Outdoor', 'Luxury')),
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_gallery_category ON gallery_images (category);
CREATE INDEX idx_gallery_created_at ON gallery_images (created_at);
CREATE INDEX idx_gallery_display_order ON gallery_images (display_order);

-- ====================================================================
-- TABLE: testimonials
-- ====================================================================
CREATE TABLE testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name text NOT NULL,
  reviewer_role text,
  content text NOT NULL,
  rating integer CHECK (rating BETWEEN 1 AND 5),
  video_url text,
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_testimonials_created_at ON testimonials (created_at);
CREATE INDEX idx_testimonials_display_order ON testimonials (display_order);
CREATE INDEX idx_testimonials_is_featured ON testimonials (is_featured);

-- ====================================================================
-- TABLE: site_content
-- ====================================================================
CREATE TABLE site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  content_type text CHECK (content_type IN ('text', 'html', 'url', 'json')) DEFAULT 'text',
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_site_content_key ON site_content (key);

-- ====================================================================
-- TABLE: plan_your_event_submissions
-- ====================================================================
CREATE TABLE plan_your_event_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  event_type text,
  event_date date,
  guest_count integer,
  venue_location text,
  message text,
  budget_range text,
  via_whatsapp boolean DEFAULT false,
  status text CHECK (status IN ('new', 'contacted', 'converted', 'archived')) DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_event_status ON plan_your_event_submissions (status);
CREATE INDEX idx_event_created_at ON plan_your_event_submissions (created_at);
CREATE INDEX idx_event_via_whatsapp ON plan_your_event_submissions (via_whatsapp);

-- ====================================================================
-- SECURITY & RLS
-- ====================================================================

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_your_event_submissions ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------------------
-- RLS Policies: Public Access
-- --------------------------------------------------------------------
CREATE POLICY "Public can read gallery images"
  ON gallery_images FOR SELECT
  USING (true);

CREATE POLICY "Public can read testimonials"
  ON testimonials FOR SELECT
  USING (true);

CREATE POLICY "Public can read site content"
  ON site_content FOR SELECT
  USING (true);

CREATE POLICY "Public can submit event inquiry"
  ON plan_your_event_submissions FOR INSERT
  WITH CHECK (true);

-- --------------------------------------------------------------------
-- RLS Policies: Admin Access (Authenticated via Supabase Auth)
-- --------------------------------------------------------------------
CREATE POLICY "Admins full access gallery"
  ON gallery_images
  FOR ALL
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));

CREATE POLICY "Admins full access testimonials"
  ON testimonials
  FOR ALL
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));

CREATE POLICY "Admins full access site content"
  ON site_content
  FOR ALL
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));

CREATE POLICY "Admins full access event submissions"
  ON plan_your_event_submissions
  FOR ALL
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));

CREATE POLICY "Admins manage admin_users"
  ON admin_users
  FOR ALL
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));

-- ====================================================================
-- TRIGGERS & DEFAULTS
-- ====================================================================
-- Auto-update timestamps for site_content
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_site_content_timestamp
BEFORE UPDATE ON site_content
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- ====================================================================
-- INITIAL SEED DATA (OPTIONAL)
-- ====================================================================

INSERT INTO site_content (key, value, content_type)
VALUES 
  ('hero_title', 'Catering & Events Perfected', 'text'),
  ('hero_subtitle', 'Experience luxury, taste, and celebration with Shanvik Catering & Event Management', 'text'),
  ('contact_phone', '+91 9840650939', 'text'),
  ('contact_email', 'info@shanvikcateringevents.com', 'text');

-- ====================================================================
-- DONE ✅
-- ====================================================================
-- The schema is now fully rebuilt with RLS, indexes, and seed data.
-- Deploy this file through Supabase SQL Editor or CLI:
-- supabase db push
-- ====================================================================
