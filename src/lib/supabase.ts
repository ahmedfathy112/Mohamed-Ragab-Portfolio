import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
// Uses env vars: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env.local
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export interface Project {
  id: string;
  title: string;
  description: string;
  github_url: string;
  linkedin_url: string;
  skills: string[];
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectFormData {
  id?: string;
  title: string;
  description: string;
  github_url: string;
  linkedin_url: string;
  skills: string[];
  image_url?: string;
  image_file?: File;
}
