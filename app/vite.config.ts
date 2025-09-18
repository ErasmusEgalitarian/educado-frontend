import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [react()],
  define: {
    global: {}, // For working with AWS
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@user": path.resolve(__dirname, "./src/features/user"),
      "@profile": path.resolve(__dirname, "./src/features/profile"),
      "@login": path.resolve(__dirname, "./src/features/login"),
      "@courses": path.resolve(__dirname, "./src/features/courses"),
      "@certificates": path.resolve(__dirname, "./src/features/certificates"),
      "@application": path.resolve(__dirname, "./src/features/application"),
      "@admin": path.resolve(__dirname, "./src/features/admin"),
      "@utilities": path.resolve(__dirname, "./src/utilities"),
      "@helpers": path.resolve(__dirname, "./src/helpers"),
    },
  },
});
