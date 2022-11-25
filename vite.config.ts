import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    visualizer(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        id: "/",
        start_url: "/",
        orientation: "any",
        name: "Payeme.io",
        short_name: "Payeme",
        description: "Vous pouvez comparer votre salaire avec celui des autres",
        theme_color: "#ffffff",
        icons: [
          {
            src: "playstore-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
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
