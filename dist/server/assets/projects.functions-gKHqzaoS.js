import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "../server.js";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const supabaseUrl = "https://qtbtjlkufgtfhdsskatf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0YnRqbGt1Zmd0Zmhkc3NrYXRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MTgzODUsImV4cCI6MjA5MDE5NDM4NX0.AnedHouW2XzSqNLED3UNp8vRDnQ27l35I-CFsWvyG-w";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const ProjectFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  github_url: z.string().url("Invalid GitHub URL").or(z.literal("")),
  linkedin_url: z.string().url("Invalid LinkedIn URL").or(z.literal("")),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  image_url: z.string().optional()
});
const fetchProjects_createServerFn_handler = createServerRpc({
  id: "ae0ba8a9e9a089ed014cba1b46a89704951332b9d2bcae20526498416dacd6a0",
  name: "fetchProjects",
  filename: "src/server/projects.functions.ts"
}, (opts) => fetchProjects.__executeServer(opts));
const fetchProjects = createServerFn({
  method: "GET"
}).handler(fetchProjects_createServerFn_handler, async () => {
  try {
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error("Supabase is not configured. Create a .env.local file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY");
    }
    const {
      data,
      error
    } = await supabase.from("projects").select("*").order("created_at", {
      ascending: false
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch projects");
  }
});
const fetchProjectById_createServerFn_handler = createServerRpc({
  id: "e0ef181cea001a45a50e14138f7cf15f52819265d74544c75f93f0c0df8080a0",
  name: "fetchProjectById",
  filename: "src/server/projects.functions.ts"
}, (opts) => fetchProjectById.__executeServer(opts));
const fetchProjectById = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(fetchProjectById_createServerFn_handler, async ({
  data
}) => {
  try {
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error("Supabase is not configured. Create a .env.local file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY");
    }
    const {
      data: project,
      error
    } = await supabase.from("projects").select("*").eq("id", data.id).single();
    if (error) throw error;
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to fetch project");
  }
});
const createProject_createServerFn_handler = createServerRpc({
  id: "2871509cd8e774d97bbf7a93e4182de1072e9f535a5d9149d0b1fa249d197bf0",
  name: "createProject",
  filename: "src/server/projects.functions.ts"
}, (opts) => createProject.__executeServer(opts));
const createProject = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createProject_createServerFn_handler, async ({
  data
}) => {
  try {
    const validatedData = ProjectFormSchema.parse(data);
    const {
      data: project,
      error
    } = await supabase.from("projects").insert([{
      title: validatedData.title,
      description: validatedData.description,
      github_url: validatedData.github_url,
      linkedin_url: validatedData.linkedin_url,
      skills: validatedData.skills,
      image_url: validatedData.image_url || null
    }]).select().single();
    if (error) throw error;
    return project;
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to create project");
  }
});
const updateProject_createServerFn_handler = createServerRpc({
  id: "17fd220a07e47814cc7b1ce62bd134ff8ade127f335213304cc753da35e2b57e",
  name: "updateProject",
  filename: "src/server/projects.functions.ts"
}, (opts) => updateProject.__executeServer(opts));
const updateProject = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(updateProject_createServerFn_handler, async ({
  data
}) => {
  try {
    const projectData = data?.data || data;
    const projectId = projectData?.id;
    if (!projectId) {
      throw new Error("Project ID is required for update");
    }
    const validatedData = ProjectFormSchema.parse(projectData);
    const {
      data: project,
      error
    } = await supabase.from("projects").update({
      title: validatedData.title,
      description: validatedData.description,
      github_url: validatedData.github_url,
      linkedin_url: validatedData.linkedin_url,
      skills: validatedData.skills,
      image_url: validatedData.image_url || null,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", projectId).select().single();
    if (error) throw error;
    return project;
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to update project");
  }
});
const deleteProject_createServerFn_handler = createServerRpc({
  id: "5e557fd20e7b0e896fc908d86548a34a347f5d8c361e4bbf5675b855a2588e8f",
  name: "deleteProject",
  filename: "src/server/projects.functions.ts"
}, (opts) => deleteProject.__executeServer(opts));
const deleteProject = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(deleteProject_createServerFn_handler, async ({
  data
}) => {
  console.log("Full payload received:", data);
  const projectId = data?.id || data?.data?.id || data;
  if (!projectId || typeof projectId !== "string") {
    console.error("Critical: Could not resolve ID from payload", data);
    throw new Error("Missing project ID on server side");
  }
  try {
    const {
      data: project
    } = await supabase.from("projects").select("image_url").eq("id", projectId).single();
    if (project?.image_url) {
      const parts = project.image_url.split("/projects/");
      if (parts.length > 1) {
        await supabase.storage.from("projects").remove([decodeURI(parts[1])]);
      }
    }
    const {
      error
    } = await supabase.from("projects").delete().eq("id", projectId);
    if (error) throw error;
    return {
      success: true
    };
  } catch (err) {
    throw new Error(err.message);
  }
});
const uploadProjectImage_createServerFn_handler = createServerRpc({
  id: "01104c9fc8d3ad5adebaf062bb3ffb01b88541b07adabbad0f775fce3ad4692a",
  name: "uploadProjectImage",
  filename: "src/server/projects.functions.ts"
}, (opts) => uploadProjectImage.__executeServer(opts));
const uploadProjectImage = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(uploadProjectImage_createServerFn_handler, async ({
  data
}) => {
  try {
    const buffer = Buffer.from(data.base64.split(",")[1], "base64");
    const {
      data: uploadedFile,
      error
    } = await supabase.storage.from("projects").upload(data.fileName, buffer, {
      contentType: "image/jpeg",
      upsert: false
    });
    if (error) throw error;
    const {
      data: {
        publicUrl
      }
    } = supabase.storage.from("projects").getPublicUrl(uploadedFile.path);
    return {
      url: publicUrl
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to upload image");
  }
});
export {
  createProject_createServerFn_handler,
  deleteProject_createServerFn_handler,
  fetchProjectById_createServerFn_handler,
  fetchProjects_createServerFn_handler,
  updateProject_createServerFn_handler,
  uploadProjectImage_createServerFn_handler
};
