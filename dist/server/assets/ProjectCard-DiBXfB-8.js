import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { B as Badge } from "./badge-BPHIUsEo.js";
import { c as cn } from "./utils-H80jjgLf.js";
function ProjectCard({ project, className }) {
  return /* @__PURE__ */ jsxs(
    "article",
    {
      className: cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_-32px_rgba(15,23,42,0.9)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.05]",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/projects/$slug",
            params: { slug: project.id },
            className: "block",
            children: project.image_url ? /* @__PURE__ */ jsx(
              "img",
              {
                src: project.image_url,
                alt: project.title,
                className: "h-56 w-full object-cover transition duration-500 group-hover:scale-[1.02]",
                loading: "lazy"
              }
            ) : /* @__PURE__ */ jsx("div", { className: "flex h-56 items-end bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.32),_transparent_38%),linear-gradient(135deg,_#0f172a,_#111827_55%,_#0b1120)] p-6", children: /* @__PURE__ */ jsx("p", { className: "max-w-xs text-lg font-semibold text-white", children: project.title }) })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-4 flex flex-wrap gap-2", children: project.skills.map((skill) => /* @__PURE__ */ jsx(
            Badge,
            {
              variant: "outline",
              className: "border-cyan-400/20 bg-cyan-400/10 text-cyan-100",
              children: skill
            },
            skill
          )) }),
          /* @__PURE__ */ jsx("h3", { className: "mb-3 text-xl font-semibold text-white", children: project.title }),
          /* @__PURE__ */ jsx("p", { className: "mb-6 flex-1 text-sm leading-7 text-slate-300", children: project.description }),
          /* @__PURE__ */ jsxs("div", { className: "mt-auto space-y-3", children: [
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/projects/$slug",
                params: { slug: project.id },
                className: "inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90",
                children: [
                  "View details",
                  /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
                ]
              }
            ),
            (project.github_url || project.linkedin_url) && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
              project.github_url && /* @__PURE__ */ jsxs(
                "a",
                {
                  href: project.github_url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white",
                  children: [
                    /* @__PURE__ */ jsx(Github, { size: 16 }),
                    "GitHub"
                  ]
                }
              ),
              project.linkedin_url && /* @__PURE__ */ jsxs(
                "a",
                {
                  href: project.linkedin_url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center gap-2 text-sm text-cyan-300 transition hover:text-cyan-200",
                  children: [
                    /* @__PURE__ */ jsx(Linkedin, { size: 16 }),
                    "LinkedIn"
                  ]
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  ProjectCard as P
};
