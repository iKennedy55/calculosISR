import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Replace 'renta-app' with your actual repository name if different
  base: './', // Using relative path for maximum compatibility if repo name varies
})
