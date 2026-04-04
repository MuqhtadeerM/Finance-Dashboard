import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // ── Vite 8 requires manualChunks as a FUNCTION not an object ──
        manualChunks(id) {
          // React core
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router-dom/")
          ) {
            return "vendor-react";
          }

          // MUI
          if (
            id.includes("node_modules/@mui/") ||
            id.includes("node_modules/@emotion/")
          ) {
            return "vendor-mui";
          }

          // Recharts
          if (id.includes("node_modules/recharts/")) {
            return "vendor-recharts";
          }
        },
      },
    },
  },
});
