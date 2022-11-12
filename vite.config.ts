import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, splitVendorChunkPlugin } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin(), visualizer()],
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
