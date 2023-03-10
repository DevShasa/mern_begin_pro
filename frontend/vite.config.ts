import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port : 5173, // where the client runs
    proxy: {
        '/api': {
            target: 'http://localhost:5000',
            changeOrigin: true, // change origin of host header to target url 
            secure: false // do not verify ssl 
        }
    }
  }
})
