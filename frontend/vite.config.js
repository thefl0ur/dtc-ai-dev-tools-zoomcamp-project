import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Determine the backend URL based on environment
const BACKEND_URL = process.env.VUE_APP_API_URL ||
                  (process.env.NODE_ENV === 'development' ? 'http://backend:8000' : 'http://backend:8000');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: BACKEND_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
  },
})