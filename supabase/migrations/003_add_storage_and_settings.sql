/*
  # Add Storage Support and Site Settings

  1. New Tables
    - `site_settings`
      - `id` (uuid, primary key)
      - `key` (text, unique) - Setting identifier (e.g., 'logo_url')
      - `value` (text) - Setting value
      - `updated_at` (timestamptz)
      - Used for storing site-wide settings like logo URL

  2. Storage Buckets
    - Creates 'images' bucket for storing uploaded images
    - Public access enabled for reading images
    - Authenticated users can upload images

  3. Security
    - Enable RLS on site_settings table
    - Public can read site settings
    - Authenticated users can update site settings
    - Storage policies for authenticated uploads and public reads

  4. Notes
    - All image uploads will go to the 'images' bucket
    - Images organized by type: gallery/, testimonials/, blog/, menu/, logo/
    - Maximum file size handled by Supabase defaults (50MB)
*/

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert site settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update site settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('images', 'images', true)
  ON CONFLICT (id) DO NOTHING;
END $$;

CREATE POLICY "Public can read images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can update images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'images')
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can delete images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'images');

INSERT INTO site_settings (key, value) VALUES ('logo_url', '')
ON CONFLICT (key) DO NOTHING;
