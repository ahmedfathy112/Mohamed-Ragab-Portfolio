import { createServerFn } from "@tanstack/react-start";
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

// Fetch all projects
export const fetchProjects = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      // Check if Supabase is configured
      const url = process.env.VITE_SUPABASE_URL;
      const key = process.env.VITE_SUPABASE_ANON_KEY;

      if (!url || !key) {
        throw new Error(
          "Supabase is not configured. Create a .env.local file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY",
        );
      }

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Project[];
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch projects",
      );
    }
  },
);

// Fetch single project by ID
export const fetchProjectById = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    try {
      const url = process.env.VITE_SUPABASE_URL;
      const key = process.env.VITE_SUPABASE_ANON_KEY;

      if (!url || !key) {
        throw new Error(
          "Supabase is not configured. Create a .env.local file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY",
        );
      }

      const { data: project, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", data.id)
        .single();

      if (error) throw error;
      return project as Project;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch project",
      );
    }
  });

// Create project
export const createProject = createServerFn({ method: "POST" })
  .inputValidator((data: Omit<ProjectFormData, "image_file">) => data)
  .handler(async ({ data }) => {
    try {
      // Validate input
      const validatedData = ProjectFormSchema.parse(data);

      const { data: project, error } = await supabase
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
      return project as Project;
    } catch (error) {
      console.error("Error creating project:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to create project",
      );
    }
  });

// Update project
export const updateProject = createServerFn({ method: "POST" })
  .inputValidator((data: any) => data)
  .handler(async ({ data }) => {
    try {
      const projectData = data?.data || data;
      const projectId = projectData?.id;

      if (!projectId) {
        throw new Error("Project ID is required for update");
      }

      const validatedData = ProjectFormSchema.parse(projectData);

      const { data: project, error } = await supabase
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

      return project;
    } catch (error: any) {
      console.error("Error updating project:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to update project",
      );
    }
  });

// Delete project
export const deleteProject = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    console.log("Full payload received:", data);

    const projectId = (data as any)?.id || (data as any)?.data?.id || data;

    if (!projectId || typeof projectId !== "string") {
      console.error("Critical: Could not resolve ID from payload", data);
      throw new Error("Missing project ID on server side");
    }

    try {
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

      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);
      if (error) throw error;

      return { success: true };
    } catch (err: any) {
      throw new Error(err.message);
    }
  });
// Upload image to Supabase Storage
export const uploadProjectImage = createServerFn({ method: "POST" })
  .inputValidator((data: { fileName: string; base64: string }) => data)
  .handler(async ({ data }) => {
    try {
      const buffer = Buffer.from(data.base64.split(",")[1], "base64");

      const { data: uploadedFile, error } = await supabase.storage
        .from("projects")
        .upload(data.fileName, buffer, {
          contentType: "image/jpeg",
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("projects").getPublicUrl(uploadedFile.path);

      return { url: publicUrl };
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to upload image",
      );
    }
  });
