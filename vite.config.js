import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    allowedHosts: [
      'ff981d5c8164.ngrok-free.app' // your ngrok domain
    ]
  }

})
