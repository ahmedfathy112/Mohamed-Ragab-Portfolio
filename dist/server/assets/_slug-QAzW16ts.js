import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Github, Linkedin } from "lucide-react";
import { B as Badge } from "./badge-BPHIUsEo.js";
import { e as Route } from "./router-C2G_46km.js";
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
function ProjectDetails() {
  const {
    project,
    projectError
  } = Route.useLoaderData();
  const formatDate = (value) => value ? new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }) : "N/A";
  if (!project) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-[#0a0f1e] px-4 py-24 text-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-4 text-3xl font-bold", children: "Project not found" }),
      /* @__PURE__ */ jsx("p", { className: "mb-8 text-slate-300", children: projectError ?? "The project you are looking for does not exist." }),
      /* @__PURE__ */ jsxs(Link, { to: "/projects/projects", className: "inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:opacity-90", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
        "Back to projects"
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-[#0a0f1e] px-4 py-24 text-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/projects/projects", className: "mb-8 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
      "Back to all projects"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-start", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "mb-6 flex flex-wrap gap-2", children: project.skills.map((skill) => /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-cyan-400/20 bg-cyan-400/10 text-cyan-100", children: skill }, skill)) }),
        /* @__PURE__ */ jsx("h1", { className: "mb-4 text-4xl font-bold sm:text-5xl", children: project.title }),
        /* @__PURE__ */ jsx("p", { className: "max-w-3xl text-lg leading-8 text-slate-300", children: project.description })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-white/10 bg-white/[0.03] p-6", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Project links" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          project.github_url ? /* @__PURE__ */ jsxs("a", { href: project.github_url, target: "_blank", rel: "noopener noreferrer", className: "inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10", children: [
            /* @__PURE__ */ jsx(Github, { size: 16 }),
            "Open GitHub"
          ] }) : null,
          project.linkedin_url ? /* @__PURE__ */ jsxs("a", { href: project.linkedin_url, target: "_blank", rel: "noopener noreferrer", className: "inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90", children: [
            /* @__PURE__ */ jsx(Linkedin, { size: 16 }),
            "Open LinkedIn"
          ] }) : null,
          !project.github_url && !project.linkedin_url ? /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-400", children: "External links have not been added for this project yet." }) : null
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03]", children: project.image_url ? /* @__PURE__ */ jsx("img", { src: project.image_url, alt: project.title, className: "h-auto w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "flex h-80 items-end bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.32),_transparent_36%),linear-gradient(135deg,_#0f172a,_#111827_55%,_#0b1120)] p-10", children: /* @__PURE__ */ jsx("p", { className: "text-2xl font-semibold text-white", children: project.title }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/[0.03] p-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-400", children: "Created" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-lg font-semibold text-white", children: formatDate(project.created_at) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/[0.03] p-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-400", children: "Last updated" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-lg font-semibold text-white", children: formatDate(project.updated_at) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/[0.03] p-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-400", children: "Skills used" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-lg font-semibold text-white", children: [
          project.skills.length,
          " skill",
          project.skills.length === 1 ? "" : "s"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-2xl font-semibold text-white", children: "Overview" }),
      /* @__PURE__ */ jsx("p", { className: "text-base leading-8 text-slate-300", children: project.description })
    ] })
  ] }) });
}
export {
  ProjectDetails as component
};
