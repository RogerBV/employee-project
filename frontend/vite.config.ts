import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.BACKEND_SERVER': JSON.stringify(env.BACKEND_SERVER),
      'process.env.BACKEND_PORT': JSON.stringify(env.BACKEND_PORT)
    },
    plugins: [react()],
  }
})
