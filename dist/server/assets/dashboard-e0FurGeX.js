import { jsxs, jsx } from "react/jsx-runtime";
import { useRef, useState, useCallback, useEffect } from "react";
import { f as fetchProjects, u as updateProject, c as createProject, d as deleteProject, a as uploadProjectImage } from "./router-C2G_46km.js";
import { c as cn } from "./utils-H80jjgLf.js";
import "@tanstack/react-router";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "clsx";
import "tailwind-merge";
function ProjectForm({
  project,
  onSubmit,
  onCancel,
  isSubmitting
}) {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    id: project?.id,
    title: project?.title || "",
    description: project?.description || "",
    github_url: project?.github_url || "",
    linkedin_url: project?.linkedin_url || "",
    skills: project?.skills || [],
    image_url: project?.image_url || ""
  });
  const [skillInput, setSkillInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState(
    project?.image_url || ""
  );
  const [imageError, setImageError] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size must be less than 5MB");
      return;
    }
    setImageError("");
    setFormData((prev) => ({
      ...prev,
      image_file: file
    }));
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result);
    };
    reader.readAsDataURL(file);
  };
  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    if (!formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
    }
    setSkillInput("");
  };
  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove)
    }));
  };
  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.skills.length === 0) {
      alert("Please add at least one skill");
      return;
    }
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "title",
          className: "block text-sm font-medium text-slate-200 mb-2",
          children: "Project Title"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          id: "title",
          name: "title",
          value: formData.title,
          onChange: handleInputChange,
          disabled: isSubmitting,
          placeholder: "Enter project title",
          maxLength: 255,
          required: true,
          className: cn(
            "w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white",
            "placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500",
            "transition disabled:opacity-50 disabled:cursor-not-allowed"
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "description",
          className: "block text-sm font-medium text-slate-200 mb-2",
          children: "Description"
        }
      ),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          id: "description",
          name: "description",
          value: formData.description,
          onChange: handleInputChange,
          disabled: isSubmitting,
          placeholder: "Describe your project",
          rows: 4,
          required: true,
          className: cn(
            "w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white",
            "placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500",
            "transition disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "github_url",
            className: "block text-sm font-medium text-slate-200 mb-2",
            children: "GitHub URL"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            id: "github_url",
            name: "github_url",
            value: formData.github_url,
            onChange: handleInputChange,
            disabled: isSubmitting,
            placeholder: "https://github.com/...",
            className: cn(
              "w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white",
              "placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500",
              "transition disabled:opacity-50 disabled:cursor-not-allowed"
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "linkedin_url",
            className: "block text-sm font-medium text-slate-200 mb-2",
            children: "LinkedIn Post URL"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            id: "linkedin_url",
            name: "linkedin_url",
            value: formData.linkedin_url,
            onChange: handleInputChange,
            disabled: isSubmitting,
            placeholder: "https://linkedin.com/feed/...",
            className: cn(
              "w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white",
              "placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500",
              "transition disabled:opacity-50 disabled:cursor-not-allowed"
            )
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-200 mb-2", children: "Skills" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: skillInput,
              onChange: (e) => setSkillInput(e.target.value),
              onKeyDown: handleSkillKeyDown,
              disabled: isSubmitting,
              placeholder: "Add a skill (e.g., React, TypeScript)",
              className: cn(
                "flex-1 px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white",
                "placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500",
                "transition disabled:opacity-50 disabled:cursor-not-allowed"
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleAddSkill,
              disabled: isSubmitting || !skillInput.trim(),
              className: cn(
                "px-4 py-2 rounded-lg font-medium transition",
                "bg-indigo-600 text-white hover:bg-indigo-700",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              ),
              children: "Add"
            }
          )
        ] }),
        formData.skills.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: formData.skills.map((skill) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/20 border border-indigo-500/50 text-indigo-200",
            children: [
              /* @__PURE__ */ jsx("span", { children: skill }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleRemoveSkill(skill),
                  disabled: isSubmitting,
                  className: "text-indigo-400 hover:text-indigo-200 transition disabled:opacity-50",
                  children: "×"
                }
              )
            ]
          },
          skill
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-200 mb-2", children: "Project Image" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            onClick: () => fileInputRef.current?.click(),
            className: cn(
              "border-2 border-dashed border-slate-600 rounded-lg p-6 text-center cursor-pointer",
              "transition hover:border-indigo-500 hover:bg-slate-700/50",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            ),
            children: previewUrl ? /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: previewUrl,
                  alt: "Preview",
                  className: "w-full h-40 object-cover rounded-lg"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    setPreviewUrl("");
                    setFormData((prev) => ({
                      ...prev,
                      image_file: void 0,
                      image_url: ""
                    }));
                  },
                  disabled: isSubmitting,
                  className: "text-sm text-indigo-400 hover:text-indigo-300 transition",
                  children: "Change Image"
                }
              )
            ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("div", { className: "text-3xl text-slate-400", children: "📷" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-300 font-medium", children: "Click to upload image" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: "PNG, JPG up to 5MB" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept: "image/*",
            onChange: handleImageChange,
            disabled: isSubmitting,
            className: "hidden"
          }
        ),
        imageError && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-400", children: imageError })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-700", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: isSubmitting,
          className: cn(
            "flex-1 px-6 py-2 rounded-lg font-semibold transition-all duration-200",
            "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          ),
          children: isSubmitting ? project ? "Updating..." : "Creating..." : project ? "Update Project" : "Create Project"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onCancel,
          disabled: isSubmitting,
          className: cn(
            "flex-1 px-6 py-2 rounded-lg font-semibold transition-all duration-200",
            "bg-slate-700 text-slate-200 hover:bg-slate-600",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          ),
          children: "Cancel"
        }
      )
    ] })
  ] });
}
function ProjectGrid({
  projects,
  onEdit,
  onDelete,
  isDeleting
}) {
  const [imageErrors, setImageErrors] = useState(/* @__PURE__ */ new Set());
  const handleImageError = (projectId) => {
    setImageErrors((prev) => new Set(prev).add(projectId));
  };
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: projects.filter((project) => Boolean(project?.id)).map((project) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "group relative overflow-hidden rounded-xl bg-slate-800 border border-slate-700",
        "transition-all duration-300 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/20",
        "flex flex-col h-full"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full h-56 overflow-hidden bg-slate-900", children: [
          project.image_url && !imageErrors.has(project.id) ? /* @__PURE__ */ jsx(
            "img",
            {
              src: project.image_url,
              alt: project.title,
              onError: () => handleImageError(project.id),
              className: cn(
                "w-full h-full object-cover transition-transform duration-300",
                "group-hover:scale-110"
              )
            }
          ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600/20 to-slate-900", children: /* @__PURE__ */ jsx("div", { className: "text-slate-400 text-4xl", children: "🖼️" }) }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "absolute inset-0 bg-black/60 flex items-center justify-center gap-3",
                "transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              ),
              children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => onEdit(project),
                    disabled: isDeleting,
                    className: cn(
                      "px-4 py-2 rounded-lg font-semibold transition-all",
                      "bg-indigo-600 text-white hover:bg-indigo-700",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    ),
                    children: "Edit"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => onDelete(project.id),
                    disabled: isDeleting,
                    className: cn(
                      "px-4 py-2 rounded-lg font-semibold transition-all",
                      "bg-red-600 text-white hover:bg-red-700",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    ),
                    children: "Delete"
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 p-5 flex flex-col", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2 line-clamp-2", children: project.title }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm mb-4 line-clamp-3 flex-1", children: project.description }),
          project.skills.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-wrap gap-2", children: [
            project.skills.slice(0, 3).map((skill) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "inline-block px-2 py-1 rounded-md bg-indigo-600/30 text-indigo-200 text-xs font-medium border border-indigo-500/30",
                children: skill
              },
              skill
            )),
            project.skills.length > 3 && /* @__PURE__ */ jsxs("span", { className: "inline-block px-2 py-1 rounded-md bg-slate-700 text-slate-300 text-xs font-medium", children: [
              "+",
              project.skills.length - 3
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-wrap", children: [
            project.github_url && /* @__PURE__ */ jsx(
              "a",
              {
                href: project.github_url,
                target: "_blank",
                rel: "noopener noreferrer",
                className: cn(
                  "flex-1 min-w-max px-3 py-2 rounded-lg text-center text-sm font-medium transition",
                  "bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-white"
                ),
                children: "GitHub"
              }
            ),
            project.linkedin_url && /* @__PURE__ */ jsx(
              "a",
              {
                href: project.linkedin_url,
                target: "_blank",
                rel: "noopener noreferrer",
                className: cn(
                  "flex-1 min-w-max px-3 py-2 rounded-lg text-center text-sm font-medium transition",
                  "bg-blue-600/30 text-blue-200 hover:bg-blue-600/50 border border-blue-500/30"
                ),
                children: "LinkedIn"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "px-5 py-3 bg-slate-900 border-t border-slate-700 text-xs text-slate-500", children: /* @__PURE__ */ jsxs("p", { children: [
          "Updated ",
          new Date(project.updated_at).toLocaleDateString()
        ] }) })
      ]
    },
    project.id
  )) });
}
function useNotification() {
  const [notification, setNotification] = useState(null);
  const showNotification = useCallback(
    (message, type = "success") => {
      setNotification({ message, type });
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5e3);
      return () => clearTimeout(timer);
    },
    []
  );
  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);
  return { notification, showNotification, clearNotification };
}
function ProjectsDashboard() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { notification, showNotification, clearNotification } = useNotification();
  useEffect(() => {
    loadProjects();
  }, []);
  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const data = await fetchProjects();
      const safeProjects = (data || []).filter(
        (p) => Boolean(p && p.id)
      );
      if (safeProjects.length !== (data || []).length) {
        console.warn(
          "Some projects were skipped because they were missing an id:",
          data
        );
      }
      setProjects(safeProjects);
    } catch (error) {
      console.error("Error loading projects:", error);
      setProjects([]);
      showNotification(
        error instanceof Error ? error.message : "Failed to load projects. Check your Supabase configuration.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleImageUpload = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const base64 = event.target?.result;
          const fileName = `${Date.now()}-${file.name}`;
          const result = await uploadProjectImage({
            data: { fileName, base64 }
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
  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      let imageUrl = formData.image_url;
      if (formData.image_file) {
        imageUrl = await handleImageUpload(formData.image_file);
      }
      const projectData = {
        id: formData.id,
        title: formData.title,
        description: formData.description,
        github_url: formData.github_url,
        linkedin_url: formData.linkedin_url,
        skills: formData.skills,
        image_url: imageUrl
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
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      showNotification(errorMessage, "error");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleEdit = (project) => {
    if (!project || !project.id) {
      showNotification(
        "خطأ: لا يمكن تعديل هذا المشروع، المعرف مفقود.",
        "error"
      );
      console.error("Missing project or ID:", project);
      return;
    }
    setEditingProject({ ...project });
    setIsFormOpen(true);
    console.log("Editing project ID:", project.id);
  };
  const handleDelete = async (projectId) => {
    if (!projectId) return;
    if (!confirm("Are you sure?")) return;
    try {
      setIsSubmitting(true);
      await deleteProject({ data: { id: projectId } });
      showNotification("Project deleted!", "success");
      await loadProjects();
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "Project Dashboard" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400", children: "Manage your portfolio projects" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setEditingProject(null);
            setIsFormOpen(!isFormOpen);
          },
          disabled: isSubmitting,
          className: cn(
            "mt-4 sm:mt-0 px-6 py-2 rounded-lg font-semibold transition-all duration-200",
            "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          ),
          children: isFormOpen ? "Cancel" : "+ New Project"
        }
      )
    ] }),
    notification && /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "mb-6 p-4 rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-top",
          notification.type === "success" ? "bg-emerald-900 border border-emerald-700 text-emerald-100" : "bg-red-900 border border-red-700 text-red-100"
        ),
        children: [
          /* @__PURE__ */ jsx("span", { children: notification.message }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: clearNotification,
              className: "text-xl font-bold hover:opacity-70 transition",
              children: "×"
            }
          )
        ]
      }
    ),
    isFormOpen && /* @__PURE__ */ jsxs("div", { className: "mb-12 bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: editingProject ? "Edit Project" : "Add New Project" }),
      /* @__PURE__ */ jsx(
        ProjectForm,
        {
          project: editingProject,
          onSubmit: handleSubmit,
          onCancel: handleCloseForm,
          isSubmitting
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { children: isLoading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-slate-400", children: "Loading projects..." })
    ] }) }) : !projects || projects.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-20 bg-slate-800 rounded-xl border border-slate-700", children: [
      /* @__PURE__ */ jsx("p", { className: "text-slate-400 mb-4", children: "No projects yet" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsFormOpen(true),
          className: "text-indigo-400 hover:text-indigo-300 transition font-medium",
          children: "Create your first project →"
        }
      )
    ] }) : /* @__PURE__ */ jsx(
      ProjectGrid,
      {
        projects,
        onEdit: handleEdit,
        onDelete: handleDelete,
        isDeleting: isSubmitting
      }
    ) })
  ] }) });
}
function DashboardPage() {
  return /* @__PURE__ */ jsx(ProjectsDashboard, {});
}
export {
  DashboardPage as component
};
