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
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress unused external import warnings coming from TanStack internal bundles
        if (
          warning.code === "UNUSED_EXTERNAL_IMPORT" &&
          typeof warning.id === "string" &&
          warning.id.includes("@tanstack/start")
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
});

export default config;
