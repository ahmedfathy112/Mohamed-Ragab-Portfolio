import { createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
const Route$7 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mohamed Ragab | Data Analyst" },
      { name: "description", content: "Mohamed Ragab – Data Analyst turning data into actionable insights." }
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: "dark scroll-smooth", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$6 = () => import("./resume-CgXWR4F-.js");
const Route$6 = createFileRoute("/resume")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./dashboard-e0FurGeX.js");
const Route$5 = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "Project Dashboard | Portfolio"
    }, {
      name: "description",
      content: "Manage your portfolio projects with our professional dashboard"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./contact-WiKvVM2d.js");
const Route$4 = createFileRoute("/contact")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const fetchProjects = createServerFn({
  method: "GET"
}).handler(createSsrRpc("ae0ba8a9e9a089ed014cba1b46a89704951332b9d2bcae20526498416dacd6a0"));
const fetchProjectById = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(createSsrRpc("e0ef181cea001a45a50e14138f7cf15f52819265d74544c75f93f0c0df8080a0"));
const createProject = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("2871509cd8e774d97bbf7a93e4182de1072e9f535a5d9149d0b1fa249d197bf0"));
const updateProject = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("17fd220a07e47814cc7b1ce62bd134ff8ade127f335213304cc753da35e2b57e"));
const deleteProject = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("5e557fd20e7b0e896fc908d86548a34a347f5d8c361e4bbf5675b855a2588e8f"));
const uploadProjectImage = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("01104c9fc8d3ad5adebaf062bb3ffb01b88541b07adabbad0f775fce3ad4692a"));
const $$splitComponentImporter$3 = () => import("./index-BnoYioOU.js");
const Route$3 = createFileRoute("/")({
  loader: async () => {
    try {
      const projects = await fetchProjects();
      return {
        projects,
        projectsError: null
      };
    } catch (error) {
      return {
        projects: [],
        projectsError: error instanceof Error ? error.message : "Failed to load projects"
      };
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./projects-B8_u-Zfu.js");
const Route$2 = createFileRoute("/projects/projects")({
  loader: async () => {
    try {
      const projects = await fetchProjects();
      return {
        projects,
        projectsError: null
      };
    } catch (error) {
      return {
        projects: [],
        projectsError: error instanceof Error ? error.message : "Failed to load projects"
      };
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./_slug-QAzW16ts.js");
const Route$1 = createFileRoute("/projects/$slug")({
  loader: async ({
    params
  }) => {
    try {
      const project = await fetchProjectById({
        data: {
          id: params.slug
        }
      });
      return {
        project,
        projectError: null
      };
    } catch (error) {
      return {
        project: null,
        projectError: error instanceof Error ? error.message : "Failed to load project"
      };
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./_slug-BtaoMWYr.js");
const Route = createFileRoute("/blog/$slug")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ResumeRoute = Route$6.update({
  id: "/resume",
  path: "/resume",
  getParentRoute: () => Route$7
});
const DashboardRoute = Route$5.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$7
});
const ContactRoute = Route$4.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const ProjectsProjectsRoute = Route$2.update({
  id: "/projects/projects",
  path: "/projects/projects",
  getParentRoute: () => Route$7
});
const ProjectsSlugRoute = Route$1.update({
  id: "/projects/$slug",
  path: "/projects/$slug",
  getParentRoute: () => Route$7
});
const BlogSlugRoute = Route.update({
  id: "/blog/$slug",
  path: "/blog/$slug",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  ContactRoute,
  DashboardRoute,
  ResumeRoute,
  BlogSlugRoute,
  ProjectsSlugRoute,
  ProjectsProjectsRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$3 as R,
  uploadProjectImage as a,
  Route$2 as b,
  createProject as c,
  deleteProject as d,
  Route$1 as e,
  fetchProjects as f,
  Route as g,
  router as r,
  updateProject as u
};
