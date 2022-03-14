import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { createHtmlPlugin } from "vite-plugin-html"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[ext]",
        manualChunks: undefined,
        // chunkFileNames: "assets/[name].js",
        entryFileNames: "assets/[name].js",
      },
    },
  },
  root: "./src",
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
    }),
  ],
})
