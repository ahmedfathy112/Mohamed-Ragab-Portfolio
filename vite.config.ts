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
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    // tanstackStart و viteReact يفضل وضعهما في النهاية
    // لضمان معالجة الملفات بعد الـ تصفية والمسارات
    tanstackStart(),
    viteReact(),
  ],
});

export default config;
