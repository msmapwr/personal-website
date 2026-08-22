import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 相对 base，兼容根地址与子路径部署（GitHub Pages）
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          fluent: ["@fluentui/react-components", "@fluentui/react-icons"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
