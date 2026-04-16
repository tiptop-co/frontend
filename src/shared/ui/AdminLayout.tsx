import { Outlet } from 'react-router-dom'
import { TabBar } from './TabBar'

export const AdminLayout = () => (
  <div className="pb-20">
    <Outlet />
    <TabBar
      items={[
        { icon: '👥', label: 'Менеджеры', to: '/admin' },
        { icon: '📊', label: 'Статистика', to: '/admin/stats' },
        { icon: '👤', label: 'Профиль', to: '/admin/profile' },
      ]}
    />
  </div>
)
