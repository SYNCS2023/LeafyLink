import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'build') {
    return {
      plugins: [react()],
      base: '/LeafyLink/',
      server: {proxy: {
        '/api': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
          rewrite: (path) => {console.log(path); return path.replace(/^\/api/, '');},
          secure: false,      
        }
      }},
    }
  } else {
    return {
      server: {proxy: {
        '/api': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
          rewrite: (path) => {console.log(path); return path.replace(/^\/api/, '');},
          secure: false,      
        }
      }},
      plugins: [react()],
    }
  }
}
)
