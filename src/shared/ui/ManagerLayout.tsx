import { Outlet } from 'react-router-dom'
import { TabBar } from './TabBar'

export const ManagerLayout = () => (
  <div className="pb-20">
    <Outlet />
    <TabBar
      items={[
        { icon: '🍽', label: 'Меню', to: '/manager' },
        { icon: '⚙', label: 'Столы', to: '/manager/tables' },
        { icon: '👥', label: 'Персонал', to: '/manager/waiters' },
        { icon: '📊', label: 'Статистика', to: '/manager/stats' },
        { icon: '⋯', label: 'Ещё', to: '/manager/venue' },
      ]}
    />
  </div>
)
