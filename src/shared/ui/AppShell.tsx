import { Outlet } from 'react-router-dom'
import { useRestoreSession } from '@/features/auth'

export const AppShell = () => {
  const checked = useRestoreSession()

  if (!checked) {
    return (
      <div className="max-w-mobile mx-auto min-h-screen flex items-center justify-center">
        <p className="text-muted">Загрузка…</p>
      </div>
    )
  }

  return (
    <div className="max-w-mobile mx-auto min-h-screen relative">
      <Outlet />
    </div>
  )
}
