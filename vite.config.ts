import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  root: "./src",
  plugins: [react()],
})
