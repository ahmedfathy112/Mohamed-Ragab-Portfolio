import { Link } from "@tanstack/react-router";
import { ArrowRight, Github, Linkedin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/server/projects.functions";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const primaryImage = project.image_url?.[0];

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_-32px_rgba(15,23,42,0.9)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.05]",
        className,
      )}
    >
      <Link
        to="/projects/$slug"
        params={{ slug: project.id }}
        className="block"
      >
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={project.title}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-56 items-end bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.32),_transparent_38%),linear-gradient(135deg,_#0f172a,_#111827_55%,_#0b1120)] p-6">
            <p className="max-w-xs text-lg font-semibold text-white">
              {project.title}
            </p>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.skills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="border-cyan-400/20 bg-cyan-400/10 text-cyan-100"
            >
              {skill}
            </Badge>
          ))}
        </div>

        <h3 className="mb-3 text-xl font-semibold text-white">
          {project.title}
        </h3>
        <p className="mb-6 flex-1 text-sm leading-7 text-slate-300">
          {project.description.split("\n")[0]}...
        </p>

        <div className="mt-auto space-y-3">
          <Link
            to="/projects/$slug"
            params={{ slug: project.id }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            View details
            <ArrowRight size={16} />
          </Link>

          {(project.github_url || project.linkedin_url) && (
            <div className="flex flex-wrap gap-3">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
                >
                  <Github size={16} />
                  GitHub
                </a>
              )}
              {project.linkedin_url && (
                <a
                  href={project.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-cyan-300 transition hover:text-cyan-200"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
