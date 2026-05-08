import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: '/Chain_travel_resume/',
  server: {
    port: 3010,
    strictPort: true,
  },
  build: {
    target: "es2020",
    cssMinify: true,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "@tanstack/react-router"],
          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
          ],
          "vendor-motion": ["framer-motion"],
          "vendor-editor": [
            "@tiptap/core",
            "@tiptap/starter-kit",
            "@tiptap/react",
          ],
          "vendor-pdf": ["pdfjs-dist", "html2canvas", "html2pdf.js"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  optimizeDeps: {
    exclude: ["pdfjs-dist"],
    include: [
      "framer-motion",
      "@tanstack/react-router",
      "lucide-react",
    ],
  },
  ssr: {
    noExternal: ["pdfjs-dist"],
  },
  plugins: [
    tsconfigPaths(),
    tanstackStart({
      srcDirectory: "src",
      router: {
        routesDirectory: "routes",
      },
    }),
    viteReact({
      jsxImportSource: "react",
      babel: {
        plugins: [],
      },
    }),
  ],
});
