import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Prerender отключён на Vercel — сборка зависала по таймауту
const enablePrerender = process.env.ENABLE_PRERENDER === '1'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ...(enablePrerender
      ? [
          vitePrerenderPlugin({
            renderTarget: '#root',
            prerenderScript: path.join(__dirname, 'prerender', 'entry.jsx'),
            additionalPrerenderRoutes: [
              '/',
              '/concepts',
              '/work/project-alpha',
              '/work/horizon',
              '/work/gazprom-id-2025-2026',
            ],
          }),
        ]
      : []),
    {
      name: 'force-reload-on-source-change',
      handleHotUpdate({ file, server }) {
        if (file.includes('/src/')) {
          server.ws.send({ type: 'full-reload', path: '*' })
          return []
        }
      },
    },
    {
      name: 'copy-404',
      async closeBundle() {
        const { copyFileSync, existsSync } = await import('fs')
        const outDir = path.join(__dirname, 'dist')
        const indexPath = path.join(outDir, 'index.html')
        const notFoundPath = path.join(outDir, '404.html')
        if (existsSync(indexPath)) copyFileSync(indexPath, notFoundPath)
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
