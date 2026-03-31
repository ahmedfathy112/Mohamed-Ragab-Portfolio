import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { fetchProjectById } from "@/server/projects.functions";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params }) => {
    try {
      const project = await fetchProjectById({ data: { id: params.slug } });
      return { project, projectError: null };
    } catch (error) {
      return {
        project: null,
        projectError:
          error instanceof Error ? error.message : "Failed to load project",
      };
    }
  },
  component: ProjectDetails,
});

function ProjectDetails() {
  const { project, projectError } = Route.useLoaderData();
  const formatDate = (value?: string) =>
    value
      ? new Date(value).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] px-4 py-24 text-gray-100">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold">Project not found</h1>
          <p className="mb-8 text-slate-300">
            {projectError ?? "The project you are looking for does not exist."}
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] px-4 py-24 text-gray-100">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to all projects
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-start">
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
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

            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
              {project.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              {project.description.slice(0, 250)}...{" "}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Project links
            </p>
            <div className="space-y-3">
              {project.github_url ? (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Github size={16} />
                  Open GitHub
                </a>
              ) : null}

              {project.linkedin_url ? (
                <a
                  href={project.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <Linkedin size={16} />
                  Open LinkedIn
                </a>
              ) : null}

              {!project.github_url && !project.linkedin_url ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-400">
                  External links have not been added for this project yet.
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <ProjectGallery
          images={project.image_url ?? []}
          title={project.title}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm font-semibold text-slate-400">Created</p>
            <p className="mt-2 text-lg font-semibold text-white">
              {formatDate(project.created_at)}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm font-semibold text-slate-400">Last updated</p>
            <p className="mt-2 text-lg font-semibold text-white">
              {formatDate(project.updated_at)}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm font-semibold text-slate-400">Skills used</p>
            <p className="mt-2 text-lg font-semibold text-white">
              {project.skills.length} skill
              {project.skills.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <h2 className="mb-4 text-2xl font-semibold text-white">Overview</h2>
          <p className="text-base leading-8 text-slate-300">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const validImages = (images ?? []).filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!validImages.length) {
    return (
      <div className="mt-10 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03]">
        <div className="flex h-80 items-end bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.32),_transparent_36%),linear-gradient(135deg,_#0f172a,_#111827_55%,_#0b1120)] p-10">
          <p className="text-2xl font-semibold text-white">{title}</p>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % validImages.length);
  };

  return (
    <div className="mt-10 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] relative">
      <img
        src={validImages[activeIndex]}
        alt={`${title} image ${activeIndex + 1}`}
        className="h-auto w-full object-cover transition duration-500"
      />

      {validImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {validImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-2 w-2 rounded-full border border-white/40 transition ${
                  idx === activeIndex ? "bg-white" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
