import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/morrow.shop/',
  server: {
    host: true,
    port: 5173,
  },
}) 