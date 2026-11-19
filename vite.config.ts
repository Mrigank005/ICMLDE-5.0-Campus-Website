import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "ICMLDE 5.0 Campus",
        short_name: "ICMLDE 5.0",
        description: "Schedule and campus directions for ICMLDE 5.0 at UPES, Dehradun.",
        start_url: "/",
        display: "standalone",
        background_color: "#131e62",
        theme_color: "#141d62",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        // App shell, photos and locations.json are precached (cache-first). schedule.json is NOT precached.
        globPatterns: ["**/*.{js,css,html,svg,png,webp,woff2}", "data/locations.json"],
        globIgnores: ["data/schedule.json"],
        navigateFallback: "index.html",
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname === "/data/schedule.json",
            handler: "NetworkFirst",
            options: { cacheName: "schedule", networkTimeoutSeconds: 4 },
          },
        ],
      },
    }),
  ],
  test: { include: ["src/**/*.test.ts"] },
});
