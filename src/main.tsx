import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app/App'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false'
const DEBUG = import.meta.env.VITE_DEBUG === 'true'

async function enableMocking() {
  if (!import.meta.env.DEV || !USE_MOCKS) return
  const { worker } = await import('./mocks/browser')
  return worker.start({ onUnhandledRequest: 'warn' })
}

if (DEBUG) {
  console.info('[env]', {
    MODE: import.meta.env.MODE,
    API_URL: import.meta.env.VITE_API_URL ?? '/api',
    USE_MOCKS,
    DEBUG,
  })

  window.addEventListener('error', (e) => {
    console.error('[window.error]', e.error ?? e.message)
  })
  window.addEventListener('unhandledrejection', (e) => {
    console.error('[unhandledrejection]', e.reason)
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
