import { z } from "zod";
import { supabase, type Project, type ProjectFormData } from "../lib/supabase";

// Re-export types so they can be imported from server functions
export type { Project, ProjectFormData };

// Validation schemas
const ProjectFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  github_url: z.string().url("Invalid GitHub URL").or(z.literal("")),
  linkedin_url: z.string().url("Invalid LinkedIn URL").or(z.literal("")),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  image_url: z.string().optional(),
});

const ensureSupabaseEnv = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.",
    );
  }
};

export async function fetchProjects() {
  ensureSupabaseEnv();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Project[]) || [];
}

export async function fetchProjectById(input: { data: { id: string } } | { id: string }) {
  ensureSupabaseEnv();
  const id = "data" in input ? input.data.id : input.id;
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Project;
}

// Create project
export async function createProject(input: { data: Omit<ProjectFormData, "image_file"> }) {
  ensureSupabaseEnv();
  const validatedData = ProjectFormSchema.parse(input.data);
  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        title: validatedData.title,
        description: validatedData.description,
        github_url: validatedData.github_url,
        linkedin_url: validatedData.linkedin_url,
        skills: validatedData.skills,
        image_url: validatedData.image_url || null,
      },
    ])
    .select()
    .single();
  if (error) throw error;
  return data as Project;
}

// Update project
export async function updateProject(input: { data: ProjectFormData }) {
  ensureSupabaseEnv();
  const projectData = input.data;
  const projectId = projectData.id;
  if (!projectId) throw new Error("Project ID is required for update");
  const validatedData = ProjectFormSchema.parse(projectData);
  const { data, error } = await supabase
    .from("projects")
    .update({
      title: validatedData.title,
      description: validatedData.description,
      github_url: validatedData.github_url,
      linkedin_url: validatedData.linkedin_url,
      skills: validatedData.skills,
      image_url: validatedData.image_url || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", projectId)
    .select()
    .single();
  if (error) throw error;
  return data as Project;
}

// Delete project
export async function deleteProject(input: { data: { id: string } } | { id: string }) {
  ensureSupabaseEnv();
  const projectId = "data" in input ? input.data.id : input.id;
  if (!projectId) throw new Error("Missing project ID");

  const { data: project } = await supabase
    .from("projects")
    .select("image_url")
    .eq("id", projectId)
    .single();

  if (project?.image_url) {
    const parts = project.image_url.split("/projects/");
    if (parts.length > 1) {
      await supabase.storage.from("projects").remove([decodeURI(parts[1])]);
    }
  }

  const { error } = await supabase.from("projects").delete().eq("id", projectId);
  if (error) throw error;
  return { success: true };
}

export async function uploadProjectImage(input: { data: { fileName: string; base64: string } }) {
  ensureSupabaseEnv();
  const { fileName, base64 } = input.data;
  const base64Data = base64.split(",")[1] ?? base64;
  const binary = atob(base64Data);
  const bytes = Uint8Array.from({ length: binary.length }, (_, i) =>
    binary.charCodeAt(i),
  );
  const file = new File([bytes], fileName, { type: "image/jpeg" });

  const { data: uploadedFile, error } = await supabase.storage
    .from("projects")
    .upload(fileName, file, { upsert: false });
  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("projects").getPublicUrl(uploadedFile.path);

  return { url: publicUrl };
}
