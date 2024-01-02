import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
          '/api': {
              target: 'http://ishangsf.com:9000',
              changeOrigin: true,
          }
      }
  }
})
