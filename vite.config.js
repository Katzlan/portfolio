import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'force-reload-on-source-change',
      handleHotUpdate({ file, server }) {
        if (file.includes('/src/')) {
          server.ws.send({ type: 'full-reload', path: '*' })
          return []
        }
      },
    },
  ],
  server: {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
    watch: {
      usePolling: true,
    },
  },
})
