import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  last_login: string | null;
}

export interface GalleryImage {
  id: string;
  title: string;
  alt_text: string;
  image_url: string;
  category: 'Wedding' | 'Corporate' | 'Private' | 'Outdoor' | 'Luxury';
  display_order: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  reviewer_name: string;
  reviewer_role: string;
  content: string;
  rating: number;
  video_url: string;
  display_order: number;
  is_featured: boolean;
  created_at: string;
}

export interface SiteContent {
  id: string;
  key: string;
  value: string;
  content_type: 'text' | 'html' | 'url' | 'json';
  updated_at: string;
}

export interface EventSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string | null;
  guest_count: number | null;
  venue_location: string;
  message: string;
  budget_range: string;
  via_whatsapp: boolean;
  status: 'new' | 'contacted' | 'converted' | 'archived';
  created_at: string;
}
