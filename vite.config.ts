import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/ClarityAge/",
  plugins: [react()],
  server: {
    host: "0.0.0.0",
  },
});
