# 🚀 Quick Start Guide - Project Management Dashboard

Get your Project Management Dashboard up and running in 5 minutes!

## **Step 1: Set Up Supabase** (3 minutes)

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** → Create a free account
3. Create a new project (name it anything, e.g., "portfolio")
4. Wait for the project to initialize (2-3 minutes)

### 1.2 Get Your Credentials

1. Open your project dashboard
2. Navigate to **Settings (⚙️) → API**
3. Copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon Key** (long string starting with `eyJ...`)

### 1.3 Create Storage Bucket

1. In left sidebar, click **Storage**
2. Click **Create new bucket**
3. Name it: `projects`
4. Toggle **Public bucket** to ON
5. Click **Create bucket**

## **Step 2: Configure Environment** (1 minute)

### 2.1 Create `.env.local`

In your project root, create a file called `.env.local`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual credentials from Step 1.2

### 2.2 Install Dependencies

```bash
pnpm install
```

## **Step 3: Set Up Database** (1 minute)

### 3.1 Run SQL Setup

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy the entire contents of `supabase-setup.sql` from your project
4. Paste it into the query editor
5. Click **Run** (or press Cmd+Enter)
6. ✅ Database is ready!

## **Step 4: Start Using!**

### 4.1 Start Development Server

```bash
pnpm run dev
```

### 4.2 Access Dashboard

Open your browser and go to:

```
http://localhost:3000/dashboard
```

### 4.3 Create Your First Project!

1. Click **"+ New Project"** button
2. Fill in the form:
   - **Title**: My Awesome Project
   - **Description**: This is what I built!
   - **Skills**: React, Tailwind CSS
   - **GitHub URL**: Your repo link
   - **LinkedIn URL**: Your post link (or skip)
   - **Image**: Upload a screenshot
3. Click **Create Project**
4. 🎉 Your project appears in the grid!

---

## 📍 What You Just Built

✅ **Professional Dashboard** - Clean, cinematic UI
✅ **CRUD Operations** - Create, Read, Update, Delete projects
✅ **Image Upload** - Direct to Supabase Storage
✅ **Responsive Design** - Works on mobile, tablet, desktop
✅ **Real Database** - Your projects persist in Supabase
✅ **Type Safety** - TypeScript + Zod validation

## 🎨 Dashboard Features

| Feature             | Status |
| ------------------- | ------ |
| Add Projects        | ✅     |
| Edit Projects       | ✅     |
| Delete Projects     | ✅     |
| Image Upload        | ✅     |
| Skill Tags          | ✅     |
| GitHub Links        | ✅     |
| LinkedIn Links      | ✅     |
| Responsive Grid     | ✅     |
| Loading States      | ✅     |
| Error Notifications | ✅     |

## 🔗 Important Links

| Resource             | Link                 |
| -------------------- | -------------------- |
| Dashboard Route      | `/dashboard`         |
| Setup Guide          | `SETUP_DASHBOARD.md` |
| SQL Migration        | `supabase-setup.sql` |
| Environment Template | `.env.example`       |

## ⚠️ Common Issues

### **"Project not loading"**

- [ ] Check `.env.local` has correct credentials
- [ ] Verify database was created (run SQL script)
- [ ] Check browser console for errors

### **"Images not uploading"**

- [ ] Verify storage bucket name is `projects`
- [ ] Check bucket is set to public
- [ ] Ensure image file is < 5MB

### **"Form won't submit"**

- [ ] Add at least 1 skill (use Enter key)
- [ ] Use valid URLs (start with `https://`)
- [ ] Title and description are required

## 📚 Next Steps

1. **Customize Colors**: Edit Tailwind classes in components
2. **Add Authentication**: Follow `SETUP_DASHBOARD.md` security section
3. **Deploy**: Push to GitHub, connect to Netlify
4. **Add More Fields**: Extend the form and database schema

## 💡 Pro Tips

- Use `.env.example` as a template for new team members
- Keep your Anon Key secret (treat like password)
- Test image upload with a small file first
- Use Vercel for quick deployment testing

---

**You're all set! 🎉**

Enjoy your new professional Project Management Dashboard. For detailed information, see `SETUP_DASHBOARD.md`.
