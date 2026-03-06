import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App.jsx'

const routes = [
  '/',
  '/concepts',
  '/work/project-alpha',
  '/work/horizon',
  '/work/gazprom-id-2025-2026',
]

export async function prerender({ url }) {
  const html = renderToString(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>
  )

  return {
    html,
    links: new Set(routes),
  }
}
