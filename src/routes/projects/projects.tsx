import {
  Link,
  Outlet,
  createFileRoute,
  useMatchRoute,
} from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { ProjectCard } from "@/components/ProjectCard";
import { fetchProjects } from "@/server/projects.functions";

export const Route = createFileRoute("/projects")({
  loader: async () => {
    try {
      const projects = await fetchProjects();
      return { projects, projectsError: null };
    } catch (error) {
      return {
        projects: [],
        projectsError:
          error instanceof Error ? error.message : "Failed to load projects",
      };
    }
  },
  component: Projects,
});

function Projects() {
  const matchRoute = useMatchRoute();
  const isViewingDetails = Boolean(
    matchRoute({ to: "/projects/$slug", fuzzy: true }),
  );
  const { projects, projectsError } = Route.useLoaderData();

  if (isViewingDetails) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] px-4 py-24 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="mb-12 max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            All Projects
          </p>
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
            A complete view of my project work
          </h1>
          <p className="text-lg leading-8 text-slate-300">
            Browse the full collection, then open any project to see Magicedits
            in action. Each project includes a detailed case study, showcasing
            the challenges, solutions, and results achieved.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-16 text-center">
            <p className="text-xl font-semibold text-white">
              No projects found
            </p>
            <p className="mt-3 text-slate-400">
              {projectsError ??
                "Create projects in the dashboard and they will appear here."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
