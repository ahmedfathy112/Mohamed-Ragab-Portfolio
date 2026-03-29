import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { P as ProjectCard } from "./ProjectCard-DiBXfB-8.js";
import { b as Route } from "./router-C2G_46km.js";
import "./badge-BPHIUsEo.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router/ssr/server";
function Projects() {
  const {
    projects,
    projectsError
  } = Route.useLoaderData();
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-[#0a0f1e] px-4 py-24 text-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "mb-8 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
      "Back to home"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-12 max-w-3xl", children: [
      /* @__PURE__ */ jsxs("p", { className: "mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300", children: [
        /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-cyan-300" }),
        "All Projects"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mb-4 text-4xl font-bold sm:text-5xl", children: "A complete view of my project work" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg leading-8 text-slate-300", children: "Browse the full collection, then open any project to see Magicedits in action. Each project includes a detailed case study, showcasing the challenges, solutions, and results achieved." })
    ] }),
    projects.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid gap-8 md:grid-cols-2 xl:grid-cols-3", children: projects.map((project) => /* @__PURE__ */ jsx(ProjectCard, { project }, project.id)) }) : /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-16 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xl font-semibold text-white", children: "No projects found" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-slate-400", children: projectsError ?? "Create projects in the dashboard and they will appear here." })
    ] })
  ] }) });
}
export {
  Projects as component
};
