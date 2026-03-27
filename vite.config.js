import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Prevent service workers from caching dev server responses
      "Service-Worker-Allowed": "/",
      "Cache-Control": "no-store",
    },
  },
});
