import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, splitVendorChunkPlugin } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin(), visualizer()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          mui: ["@mui/material"],
          firebase_auth: ["@firebase/auth"],
          firebase_firestore: ["@firebase/firestore"],
          firebase_database: ["@firebase/database"],
        },
      },
    },
  },
});
