# Project Management Dashboard Setup Guide

Complete setup instructions for the professional Project Management Dashboard integrated with Supabase.

## 📋 Table of Contents

1. [Installation](#installation)
2. [Environment Configuration](#environment-configuration)
3. [Supabase Setup](#supabase-setup)
4. [Database Schema](#database-schema)
5. [File Structure](#file-structure)
6. [Component Overview](#component-overview)
7. [Usage](#usage)
8. [Features](#features)

## 🚀 Installation

### 1. Install Dependencies

```bash
pnpm install
```

This installs the required `@supabase/supabase-js` package alongside existing dependencies.

### 2. Install & Configure Required Packages

```bash
pnpm add @supabase/supabase-js
```

## 🔧 Environment Configuration

### 1. Create `.env.local` file

In the root of your project, create a `.env.local` file:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Get Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Navigate to **Settings → API**
4. Copy your **Project URL** and **Anon Key**
5. Paste them into `.env.local`

### 3. Update `vite.config.ts` (if using environment variables)

Ensure Vite is configured to expose environment variables:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
  },
});
```

## 🗄️ Supabase Setup

### 1. Create Project Tables

In your Supabase dashboard, run the following SQL to create the required tables:

```sql
-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  github_url VARCHAR(255),
  linkedin_url VARCHAR(255),
  skills TEXT[] NOT NULL,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT USING (true);

-- Create policy to allow anyone to insert
CREATE POLICY "Allow public insert" ON projects
  FOR INSERT WITH CHECK (true);

-- Create policy to allow anyone to update
CREATE POLICY "Allow public update" ON projects
  FOR UPDATE USING (true);

-- Create policy to allow anyone to delete
CREATE POLICY "Allow public delete" ON projects
  FOR DELETE USING (true);
```

### 2. Create Storage Bucket

1. Go to **Storage** in Supabase dashboard
2. Click **Create Bucket**
3. Name it `projects`
4. Make it **Public**
5. Create the bucket

### 3. Set Storage Bucket Policies

In the bucket settings, ensure public read access is enabled:

```sql
-- Make bucket publicly readable
CREATE POLICY "Public Read"
ON storage.objects FOR SELECT
USING (bucket_id = 'projects');

-- Allow public uploads
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'projects');

-- Allow public deletes
CREATE POLICY "Public Delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'projects');
```

## 📁 File Structure

```
src/
├── components/
│   ├── ProjectsDashboard.tsx    # Main dashboard component (orchestrates everything)
│   ├── ProjectForm.tsx          # Reusable form for add/edit projects
│   ├── ProjectGrid.tsx          # Grid view of projects with cards
│   └── ui/
│       └── ...existing UI components
├── lib/
│   ├── supabase.ts             # Supabase client initialization & types
│   ├── useNotification.ts       # Notification hook for success/error messages
│   └── utils.ts                # Utility functions (cn, etc.)
├── server/
│   └── projects.functions.ts   # TanStack Start server functions (CRUD operations)
├── routes/
│   ├── __root.tsx
│   ├── dashboard.tsx           # Dashboard route at /dashboard
│   └── ...existing routes
└── styles.css                  # Tailwind CSS
```

## 🎯 Component Overview

### `ProjectsDashboard.tsx`

**Main orchestrator component**

- Manages overall state (projects, loading, form visibility)
- Handles API calls via server functions
- Renders the header, form, grid, and notifications
- Manages notifications and loading states

### `ProjectForm.tsx`

**Form for adding/editing projects**

- Reusable for both create and edit operations
- Fields: Title, Description, GitHub URL, LinkedIn URL, Skills (tag input), Image Upload
- Image preview with file validation (5MB limit, image types only)
- Skill tag management with add/remove functionality
- Form validation using Zod schemas

### `ProjectGrid.tsx`

**Responsive grid display of projects**

- Displays projects in a 1-column (mobile), 2-column (tablet), 3-column (desktop) layout
- Each project card shows:
  - Project image with hover overlay
  - Title and description
  - Up to 3 skills tags with "+X more" indicator
  - GitHub and LinkedIn links
  - Edit/Delete buttons on hover
  - Last updated date

### `supabase.ts`

**Supabase client initialization**

- Initializes Supabase client with environment variables
- Exports TypeScript interfaces: `Project`, `ProjectFormData`
- Client-side interface to Supabase

### `projects.functions.ts`

**TanStack Start server functions**

- `fetchProjects()` - GET all projects from Supabase
- `createProject(data)` - POST new project with validation
- `updateProject(data)` - PUT update existing project
- `deleteProject(id)` - DELETE project and its image from storage
- `uploadProjectImage(file)` - Upload image to Supabase Storage bucket
- All functions include proper error handling and validation via Zod

### `useNotification.ts`

**Custom hook for notifications**

- Manages success/error notification state
- Auto-clears after 5 seconds
- Returns: `notification`, `showNotification()`, `clearNotification()`

## 🎨 UI/UX Features

### Design System

- **Color Palette**: Slate (primary), Indigo (accent), with dark mode
- **Layout**: Flexbox-based for full responsiveness
- **Animations**: Smooth transitions, hover effects, fade-in animations
- **Typography**: Clear hierarchy with varied font sizes

### Responsive Design

- **Mobile**: 1 column layout, full-width inputs
- **Tablet**: 2-column grid, adjusted spacing
- **Desktop**: 3-column grid, optimal card sizing

### Interactive Elements

- Hover effects on project cards (scale image, show overlay with actions)
- Loading spinners for async operations
- Form validation with error messages
- Notification toasts for user feedback
- Image preview before upload
- Skill tags with add/remove functionality

### Accessibility

- Semantic HTML elements
- Disabled state styles on submit buttons during loading
- Clear focus states on inputs and buttons
- Alt text for images
- Proper button types and aria labels

## 📖 Usage

### Access the Dashboard

1. Start the development server:

```bash
pnpm run dev
```

2. Navigate to: `http://localhost:3000/dashboard`

### Add a Project

1. Click **"+ New Project"** button
2. Fill in the form fields:
   - **Title**: Project name
   - **Description**: Project details
   - **GitHub URL**: Link to repository (optional)
   - **LinkedIn URL**: Link to post (optional)
   - **Skills**: Enter each skill and click "Add"
   - **Image**: Click upload area to select image
3. Click **"Create Project"**
4. See success notification and project appears in grid

### Edit a Project

1. Hover over a project card
2. Click **"Edit"** button
3. Modify the form fields
4. Click **"Update Project"**
5. Project updates in the grid

### Delete a Project

1. Hover over a project card
2. Click **"Delete"** button
3. Confirm deletion in the browser prompt
4. Project is removed from grid and image deleted from storage

## ✨ Features

### CRUD Operations

- ✅ **Create**: Add new projects with full form validation
- ✅ **Read**: Display all projects in responsive grid
- ✅ **Update**: Edit existing projects with same form
- ✅ **Delete**: Remove projects with confirmation

### Image Handling

- ✅ Upload to Supabase Storage bucket `projects`
- ✅ Automatic public URL generation
- ✅ File validation (type & size: 5MB max)
- ✅ Image preview before upload
- ✅ Cleanup on project deletion

### Form Features

- ✅ Reusable form component (add & edit)
- ✅ Input validation with Zod schemas
- ✅ Dynamic skill tag management
- ✅ URL field validation
- ✅ Loading states during submission
- ✅ Error handling and user feedback

### UI/UX Features

- ✅ Professional cinematic dark theme
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Hover effects and smooth transitions
- ✅ Loading indicators
- ✅ Success/error notifications
- ✅ Flexbox-based layouts
- ✅ Clean, modern color palette (Slate + Indigo)

### Technical Features

- ✅ Type-safe with TypeScript
- ✅ Zod validation on server and client
- ✅ TanStack Start server functions
- ✅ Tailwind CSS for styling
- ✅ Radix UI primitives (optional integration)
- ✅ No authentication required (public access)
- ✅ Auto-generated route tree

## 🔐 Security Notes

**⚠️ Important**: This dashboard is publicly accessible without authentication. For production:

1. Implement Netlify Identity or authentication provider
2. Use Row-Level Security (RLS) policies to restrict access
3. Validate all inputs on both client and server
4. Implement API rate limiting
5. Use environment variables for secrets
6. Never expose admin keys in the frontend

## 🐛 Troubleshooting

### Images not uploading

- Check Supabase Storage bucket name is `projects`
- Verify bucket is set to public
- Check CORS settings in Supabase

### Projects not loading

- Verify environment variables are set correctly
- Check Supabase connection string
- Enable RLS policies for public read access

### Form validation errors

- Ensure URLs are properly formatted (`https://...`)
- At least one skill must be added
- Title and description are required fields

### Style issues

- Ensure Tailwind CSS is properly configured
- Run `pnpm build` to check for compilation errors
- Clear browser cache and restart dev server

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [TanStack Start Docs](https://tanstack.com/start/latest)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zod Validation](https://zod.dev)

---

**Ready to go!** Your professional Project Management Dashboard is now fully set up. Start managing your portfolio projects with ease. 🚀
