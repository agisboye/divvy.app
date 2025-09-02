import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 3001
  },
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        download: "./download.html",
        invite: "./invite.html",
        privacy: "./privacy.html",
        terms: "./terms.html"
      }
    }
  }
})
