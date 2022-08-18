import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import react from '@vitejs/plugin-react'

dotenv.config({ path: '../.env.default' })
dotenv.config({ path: '../.env' })

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.FRONTEND_PORT,
    proxy: {
      '/socket.io': {
        target: `http://localhost:${process.env.BACKEND_PORT}`,
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
