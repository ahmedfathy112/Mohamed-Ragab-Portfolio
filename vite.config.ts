import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import contentCollections from "@content-collections/vite";

// لاحظ أننا حذفنا استيراد netlify

const config = defineConfig({
  plugins: [
    contentCollections(),
    viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  // هذا الجزء هو المفتاح لحل مشكلة الـ Hanging والـ createRequire
  ssr: {
    external: ["@content-collections/core", "fdir", "module", "fs", "path"],
  },
  optimizeDeps: {
    exclude: ["@content-collections/vite", "fdir"],
  },
});

export default config;
