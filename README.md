# Shanvik Catering & Event Management

A modern, full-stack catering and event management website built with React, TypeScript, Tailwind CSS, and Supabase. Features a secure admin dashboard for content management, event inquiry system with WhatsApp integration, and a responsive design optimized for all devices.

## Features

### Public-Facing
- **Hero Section**: Eye-catching video background with animated text overlay
- **Our Story**: Company history with beautiful parallax image gallery
- **Catering Services**: Detailed pages for Wedding, Corporate, and Private events
- **Gallery**: Filterable image gallery with categories (Wedding, Corporate, Private, Outdoor, Luxury)
- **Testimonials**: Client reviews with star ratings and video testimonials
- **Plan Your Event**: Comprehensive event inquiry form with WhatsApp integration
- **Contact Page**: Multiple contact methods and form submissions
- **Responsive Design**: Mobile-first design with smooth animations

### Admin Dashboard
- **Gallery Management**: Upload, edit, delete, and organize event photos
- **Testimonial Management**: Add client reviews with ratings and video URLs
- **Site Content Management**: Manage dynamic content across the website
- **Event Inquiry Viewer**: View and manage event planning submissions with status tracking
- **Secure Authentication**: Email/password authentication via Supabase Auth
- **Real-time Updates**: Instant CRUD operations with Supabase

### Technical Features
- **Database**: PostgreSQL via Supabase with Row Level Security (RLS)
- **Authentication**: Secure admin authentication using Supabase Auth
- **WhatsApp Integration**: Automated WhatsApp notifications for new event inquiries
- **Edge Functions**: Serverless functions for WhatsApp webhook processing
- **SEO Optimized**: Meta tags, semantic HTML, and Open Graph support
- **Performance**: Lazy-loaded images, code splitting, and optimized bundle size

## Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Row Level Security
  - Edge Functions
  - Real-time subscriptions

## Project Structure

```
shanvik-catering/
├── src/
│   ├── components/
│   │   ├── admin/              # Admin dashboard components
│   │   │   ├── EventSubmissionsViewer.tsx
│   │   │   ├── GalleryManager.tsx
│   │   │   ├── ImageUpload.tsx
│   │   │   ├── SiteContentManager.tsx
│   │   │   └── TestimonialManager.tsx
│   │   ├── CateringServices.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── GalleryPreview.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── OurStory.tsx
│   │   ├── PlanYourEvent.tsx
│   │   ├── ServiceCard.tsx
│   │   └── Testimonials.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx     # Authentication context
│   ├── lib/
│   │   └── supabase.ts         # Supabase client & TypeScript types
│   ├── pages/
│   │   ├── AdminDashboard.tsx  # Main admin interface
│   │   ├── AdminLogin.tsx      # Admin authentication
│   │   ├── ContactPage.tsx
│   │   ├── Gallery.tsx
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   ├── ServiceCorporate.tsx
│   │   ├── ServicePrivate.tsx
│   │   └── ServiceWedding.tsx
│   ├── utils/
│   │   └── imageUpload.ts      # Image upload utilities
│   ├── App.tsx                 # Main app component
│   └── main.tsx                # Entry point
├── supabase/
│   ├── functions/
│   │   └── whatsapp-webhook/   # WhatsApp integration
│   │       └── index.ts
│   └── migrations/
│       └── 100_fresh_schema_rebuild.sql  # Database schema
├── public/
│   └── Site-logo.png           # Logo asset
└── package.json
```

## Database Schema

### Tables

#### 1. admin_users
Stores admin user information for dashboard access.
- `id` (uuid, PK)
- `email` (text, unique)
- `created_at` (timestamptz)
- `last_login` (timestamptz)

#### 2. gallery_images
Event photography organized by category.
- `id` (uuid, PK)
- `title` (text)
- `alt_text` (text)
- `image_url` (text)
- `category` (text) - Wedding, Corporate, Private, Outdoor, Luxury
- `display_order` (integer)
- `created_at` (timestamptz)

#### 3. testimonials
Client reviews and video testimonials.
- `id` (uuid, PK)
- `reviewer_name` (text)
- `reviewer_role` (text)
- `content` (text)
- `rating` (integer, 1-5)
- `video_url` (text)
- `display_order` (integer)
- `is_featured` (boolean)
- `created_at` (timestamptz)

#### 4. site_content
Dynamic site content managed through admin.
- `id` (uuid, PK)
- `key` (text, unique)
- `value` (text)
- `content_type` (text) - text, html, url, json
- `updated_at` (timestamptz)

#### 5. plan_your_event_submissions
Event planning inquiry submissions.
- `id` (uuid, PK)
- `name` (text)
- `email` (text)
- `phone` (text)
- `event_type` (text)
- `event_date` (date)
- `guest_count` (integer)
- `venue_location` (text)
- `message` (text)
- `budget_range` (text)
- `via_whatsapp` (boolean)
- `status` (text) - new, contacted, converted, archived
- `created_at` (timestamptz)

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

**Public Access:**
- `gallery_images`: Read access for all images
- `testimonials`: Read access for all testimonials
- `site_content`: Read access for all content
- `plan_your_event_submissions`: Insert only (form submissions)

**Admin Access:**
- Authenticated admins have full CRUD access to all tables
- Admin verification via `admin_users` table check
- Secure authentication using Supabase Auth

### Indexes

Performance optimized with indexes on:
- `gallery_images`: category, created_at, display_order
- `testimonials`: created_at, display_order, is_featured
- `site_content`: key
- `plan_your_event_submissions`: status, created_at, via_whatsapp

## WhatsApp Integration

The system includes automated WhatsApp notifications for new event inquiries.

### How It Works

1. Client submits event planning form with WhatsApp option enabled
2. Form data saved to `plan_your_event_submissions` table
3. Edge function `whatsapp-webhook` processes the submission
4. Formatted message sent to WhatsApp number: **+91 98406 50939**

### Edge Function

Located at: `supabase/functions/whatsapp-webhook/index.ts`

Features:
- CORS-enabled for cross-origin requests
- Formats submission data into readable WhatsApp message
- Handles errors gracefully
- Returns WhatsApp deep link for instant messaging

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Supabase account (free tier available)

### Quick Start Guide

Follow these steps to get the application running locally:

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd shanvik-catering
```

#### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including React, TypeScript, Tailwind CSS, Supabase client, and other dependencies.

#### 3. Environment Configuration

The `.env` file is already configured with the Supabase connection details:

```env
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Note**: The database and all tables are already set up and ready to use.

#### 4. Database Setup

The database schema has been applied automatically with the following tables:
- `admin_users` - Admin authentication
- `gallery_images` - Event photo gallery
- `testimonials` - Client reviews
- `site_content` - Dynamic website content
- `plan_your_event_submissions` - Event inquiry forms

All tables have Row Level Security (RLS) enabled for secure data access.

#### 5. Create an Admin Account

To access the admin dashboard, you need to create an admin user:

**Option A: Using Supabase Dashboard (Recommended)**
1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Users**
3. Click **Add user** > **Create new user**
4. Enter email: `admin@shanvik.com` (or your preferred email)
5. Enter a secure password
6. Click **Create user**
7. Copy the user's UUID from the users list
8. Go to **SQL Editor** and run:
```sql
INSERT INTO admin_users (id, email)
VALUES ('paste-user-uuid-here', 'admin@shanvik.com');
```

**Option B: Using SQL Only**
1. Go to **SQL Editor** in Supabase dashboard
2. Run the following (replace email and password):
```sql
-- This creates both auth user and admin entry
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, confirmation_token)
VALUES (
  'admin@shanvik.com',
  crypt('your-secure-password', gen_salt('bf')),
  now(),
  ''
);

INSERT INTO admin_users (id, email)
SELECT id, email FROM auth.users WHERE email = 'admin@shanvik.com';
```

#### 6. Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

#### 7. Build for Production

To create an optimized production build:

```bash
npm run build
```

This will:
- Type-check all TypeScript files
- Bundle and optimize all assets
- Generate static files in the `dist/` directory

#### 8. Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Accessing the Admin Dashboard

1. Navigate to: `http://localhost:5173/admin/login`
2. Enter the admin credentials you created in step 5
3. Click **Sign In**

You now have access to:
- Gallery Management
- Testimonial Management
- Site Content Management
- Event Inquiry Viewer

### Troubleshooting

**Cannot connect to database:**
- Verify the `.env` file exists and has correct credentials
- Check your internet connection
- Ensure Supabase project is active

**Admin login fails:**
- Verify admin user was created in `admin_users` table
- Check that the UUID matches the auth.users UUID
- Ensure email/password are correct

**Build errors:**
- Run `npm install` to ensure all dependencies are installed
- Clear cache: `rm -rf node_modules .vite && npm install`
- Check Node.js version: `node --version` (should be 18+)

**TypeScript errors:**
- Run type check: `npm run typecheck`
- Ensure all imports are correct
- Check for missing type definitions

### Deployment

The project is configured for deployment on:
- **Frontend**: Vercel, Netlify, or Cloudflare Pages
- **Database**: Supabase (hosted)
- **Edge Functions**: Supabase Edge Functions

Configuration file included: `vercel.json`

## Admin Access

Access the admin dashboard at: `/admin/login`

Use the credentials created during setup to log in and manage:
- Gallery images
- Testimonials
- Site content
- Event inquiries

## CRUD Operations

### Gallery Management
- **Create**: Upload images with title, alt text, category, and display order
- **Read**: View all gallery images sorted by display order
- **Update**: Edit image details and reorder images
- **Delete**: Remove images from gallery

### Testimonial Management
- **Create**: Add testimonials with name, role, rating, content, video URL
- **Read**: View all testimonials with featured status
- **Update**: Edit testimonial details and featured status
- **Delete**: Remove testimonials

### Site Content Management
- **Create**: Add new content keys with values and types
- **Read**: View all site content entries
- **Update**: Edit content values (keys are immutable)
- **Delete**: Remove content entries

### Event Inquiry Management
- **Read**: View all event inquiries with filters by status
- **Update**: Change inquiry status (new → contacted → converted → archived)
- **Delete**: Remove processed inquiries

## SEO Optimization

- Semantic HTML5 structure
- Meta tags for description and keywords
- Open Graph tags for social sharing
- Alt text for all images
- Proper heading hierarchy
- Mobile-responsive design
- Fast loading with lazy-loaded images

## Security Features

- Row Level Security (RLS) on all database tables
- Admin authentication via Supabase Auth
- JWT token verification
- Secure password hashing
- Environment variables for sensitive data
- Input sanitization on all forms
- CORS configuration on edge functions

## Performance Optimizations

- Code splitting with React Router
- Lazy-loaded images
- Optimized video backgrounds with posters
- Framer Motion for GPU-accelerated animations
- Tailwind CSS for minimal CSS bundle
- Database indexes on frequently queried columns
- Edge functions for serverless scalability

## Contact Information

- **Phone**: +91 98406 50939
- **Email**: info@shanvikcateringevents.com
- **Instagram**: @shanvikcateringevents
- **Website**: shanvikcateringevents.com

## Credits

Developed by:
- **Thanush** - Frontend Development
- **Santhosh** - Backend Development & Database Design
- **Kathick** - UI/UX Design & Integration

---

© 2024 Shanvik Catering & Event Management. All rights reserved.
