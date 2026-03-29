import { createFileRoute } from "@tanstack/react-router";
import ProjectsDashboard from "../components/ProjectsDashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      {
        title: "Project Dashboard | Portfolio",
      },
      {
        name: "description",
        content:
          "Manage your portfolio projects with our professional dashboard",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return <ProjectsDashboard />;
}
