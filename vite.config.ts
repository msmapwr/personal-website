import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 相对 base，兼容根地址与子路径部署（GitHub Pages）
  base: "./",
});
