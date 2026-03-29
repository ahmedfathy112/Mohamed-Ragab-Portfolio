import { useState, useEffect } from "react";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
  type Project,
  type ProjectFormData,
} from "../server/projects.functions.ts";
import ProjectForm from "./ProjectForm";
import ProjectGrid from "./ProjectGrid";
import { useNotification } from "../lib/useNotification";
import { cn } from "../lib/utils";

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { notification, showNotification, clearNotification } =
    useNotification();

  // Fetch projects on mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const data = await fetchProjects();
      const safeProjects = (data || []).filter((p): p is Project =>
        Boolean(p && p.id),
      );
      if (safeProjects.length !== (data || []).length) {
        console.warn(
          "Some projects were skipped because they were missing an id:",
          data,
        );
      }
      setProjects(safeProjects);
    } catch (error) {
      console.error("Error loading projects:", error);
      // Set empty array so component doesn't crash
      setProjects([]);
      showNotification(
        error instanceof Error
          ? error.message
          : "Failed to load projects. Check your Supabase configuration.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const base64 = event.target?.result as string;
          const fileName = `${Date.now()}-${file.name}`;
          const result = await uploadProjectImage({
            data: { fileName, base64 },
          });
          resolve(result.url);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (formData: ProjectFormData) => {
    try {
      setIsSubmitting(true);

      let imageUrl = formData.image_url;
      if (formData.image_file) {
        imageUrl = await handleImageUpload(formData.image_file);
      }

      const projectData: Omit<ProjectFormData, "image_file"> = {
        id: formData.id,
        title: formData.title,
        description: formData.description,
        github_url: formData.github_url,
        linkedin_url: formData.linkedin_url,
        skills: formData.skills,
        image_url: imageUrl,
      };

      if (editingProject) {
        await updateProject({ data: projectData });
        showNotification("Project updated successfully", "success");
        setEditingProject(null);
      } else {
        await createProject({ data: projectData });
        showNotification("Project created successfully", "success");
      }

      await loadProjects();
      setIsFormOpen(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      showNotification(errorMessage, "error");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project: Project) => {
    if (!project || !project.id) {
      showNotification(
        "خطأ: لا يمكن تعديل هذا المشروع، المعرف مفقود.",
        "error",
      );
      console.error("Missing project or ID:", project);
      return;
    }

    setEditingProject({ ...project });

    setIsFormOpen(true);

    console.log("Editing project ID:", project.id);
  };

  const handleDelete = async (projectId: string) => {
    if (!projectId) return;
    if (!confirm("Are you sure?")) return;

    try {
      setIsSubmitting(true);

      await deleteProject({ data: { id: projectId } });

      showNotification("Project deleted!", "success");
      await loadProjects();
    } catch (error: any) {
      showNotification(error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Project Dashboard
            </h1>
            <p className="text-slate-400">Manage your portfolio projects</p>
          </div>
          <button
            onClick={() => {
              setEditingProject(null);
              setIsFormOpen(!isFormOpen);
            }}
            disabled={isSubmitting}
            className={cn(
              "mt-4 sm:mt-0 px-6 py-2 rounded-lg font-semibold transition-all duration-200",
              "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            {isFormOpen ? "Cancel" : "+ New Project"}
          </button>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div
            className={cn(
              "mb-6 p-4 rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-top",
              notification.type === "success"
                ? "bg-emerald-900 border border-emerald-700 text-emerald-100"
                : "bg-red-900 border border-red-700 text-red-100",
            )}
          >
            <span>{notification.message}</span>
            <button
              onClick={clearNotification}
              className="text-xl font-bold hover:opacity-70 transition"
            >
              ×
            </button>
          </div>
        )}

        {/* Form Section */}
        {isFormOpen && (
          <div className="mb-12 bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h2>
            <ProjectForm
              project={editingProject}
              onSubmit={handleSubmit}
              onCancel={handleCloseForm}
              isSubmitting={isSubmitting}
            />
          </div>
        )}

        {/* Projects Grid */}
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-slate-400">Loading projects...</p>
              </div>
            </div>
          ) : !projects || projects.length === 0 ? (
            <div className="text-center py-20 bg-slate-800 rounded-xl border border-slate-700">
              <p className="text-slate-400 mb-4">
                {!import.meta.env.VITE_SUPABASE_URL
                  ? "⚙️ Supabase not configured"
                  : "No projects yet"}
              </p>
              {!import.meta.env.VITE_SUPABASE_URL ? (
                <div className="space-y-4">
                  <p className="text-sm text-slate-400 mb-4">
                    To get started, create a{" "}
                    <code className="text-indigo-400">.env.local</code> file in
                    your project root:
                  </p>
                  <div className="bg-slate-900 p-4 rounded-lg text-left text-sm text-slate-300 overflow-auto">
                    <code>
                      VITE_SUPABASE_URL=https://your-project.supabase.co
                      <br />
                      VITE_SUPABASE_ANON_KEY=your-anon-key
                    </code>
                  </div>
                  <p className="text-xs text-slate-500">
                    See QUICKSTART.md for setup instructions →
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="text-indigo-400 hover:text-indigo-300 transition font-medium"
                >
                  Create your first project →
                </button>
              )}
            </div>
          ) : (
            <ProjectGrid
              projects={projects}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
}
