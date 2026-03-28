import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub project pages need a repo-scoped base; set VITE_BASE_PATH in CI (see .github/workflows).
  base: process.env.VITE_BASE_PATH ?? "/",
});
