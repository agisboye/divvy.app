import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        download: "./download.html",
        privacy: "./privacy.html",
        terms: "./terms.html"
      }
    }
  }
})
