import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import contentCollections from "@content-collections/vite";

export default defineConfig({
  plugins: [
    contentCollections(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    react(),
  ],
});
