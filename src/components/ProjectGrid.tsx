import { type Project } from "../server/projects.functions.ts";
import { cn } from "../lib/utils";
import { useState } from "react";

interface ProjectGridProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => Promise<void>;
  isDeleting: boolean;
}

export default function ProjectGrid({
  projects,
  onEdit,
  onDelete,
  isDeleting,
}: ProjectGridProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (projectId: string) => {
    setImageErrors((prev) => new Set(prev).add(projectId));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects
        .filter((project) => Boolean(project?.id))
        .map((project) => (
          <div
            key={project.id}
            className={cn(
              "group relative overflow-hidden rounded-xl bg-slate-800 border border-slate-700",
              "transition-all duration-300 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/20",
              "flex flex-col h-full",
            )}
          >
            {/* Image Container */}
            <div className="relative w-full h-56 overflow-hidden bg-slate-900">
              {project.image_url && !imageErrors.has(project.id) ? (
                <img
                  src={project.image_url}
                  alt={project.title}
                  onError={() => handleImageError(project.id)}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-300",
                    "group-hover:scale-110",
                  )}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600/20 to-slate-900">
                  <div className="text-slate-400 text-4xl">🖼️</div>
                </div>
              )}

              {/* Overlay with actions on hover */}
              <div
                className={cn(
                  "absolute inset-0 bg-black/60 flex items-center justify-center gap-3",
                  "transition-opacity duration-300 opacity-0 group-hover:opacity-100",
                )}
              >
                <button
                  onClick={() => onEdit(project)}
                  disabled={isDeleting}
                  className={cn(
                    "px-4 py-2 rounded-lg font-semibold transition-all",
                    "bg-indigo-600 text-white hover:bg-indigo-700",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                  )}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(project.id)}
                  disabled={isDeleting}
                  className={cn(
                    "px-4 py-2 rounded-lg font-semibold transition-all",
                    "bg-red-600 text-white hover:bg-red-700",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                  )}
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-5 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                {project.title}
              </h3>

              <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
                {project.description}
              </p>

              {/* Skills */}
              {project.skills.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="inline-block px-2 py-1 rounded-md bg-indigo-600/30 text-indigo-200 text-xs font-medium border border-indigo-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 3 && (
                    <span className="inline-block px-2 py-1 rounded-md bg-slate-700 text-slate-300 text-xs font-medium">
                      +{project.skills.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Links */}
              <div className="flex gap-2 flex-wrap">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex-1 min-w-max px-3 py-2 rounded-lg text-center text-sm font-medium transition",
                      "bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-white",
                    )}
                  >
                    GitHub
                  </a>
                )}
                {project.linkedin_url && (
                  <a
                    href={project.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex-1 min-w-max px-3 py-2 rounded-lg text-center text-sm font-medium transition",
                      "bg-blue-600/30 text-blue-200 hover:bg-blue-600/50 border border-blue-500/30",
                    )}
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>

            {/* Card Footer - Meta Info */}
            <div className="px-5 py-3 bg-slate-900 border-t border-slate-700 text-xs text-slate-500">
              <p>Updated {new Date(project.updated_at).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
