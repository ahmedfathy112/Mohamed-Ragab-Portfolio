import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import contentCollections from "@content-collections/vite";

// لاحظ أننا حذفنا استيراد netlify

export default defineConfig({
  // ... الإضافات الأخرى
  optimizeDeps: {
    exclude: ["@content-collections/vite", "fdir"],
  },
  build: {
    rollupOptions: {
      external: ["module", "fs", "path"],
    },
  },
});
