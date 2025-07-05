import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { APP_NAME } from "./src/config/constants";

// https://vite.dev/config/
export default defineConfig({
  base: APP_NAME ? `/${APP_NAME}/` : "/",
  plugins: [react()],
});
