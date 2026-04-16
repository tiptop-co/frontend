import { Outlet } from 'react-router-dom'

export const AppShell = () => (
  <div className="max-w-mobile mx-auto min-h-screen relative">
    <Outlet />
  </div>
)
