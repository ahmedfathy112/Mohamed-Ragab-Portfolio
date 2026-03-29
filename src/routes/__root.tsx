import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router";
import "../styles.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mohamed Ragab | Data Analyst" },
      {
        name: "description",
        content:
          "Mohamed Ragab - Data Analyst turning data into actionable insights.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <>
      <HeadContent />
      <Outlet />
    </>
  );
}
