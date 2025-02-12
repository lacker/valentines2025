import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/valentines2025/',
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      host: '*.ngrok-free.app'
    },
    allowedHosts: true
  }
})
