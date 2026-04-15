import { Outlet } from 'react-router-dom'
import { TabBar } from './TabBar'

export const WaiterLayout = () => (
  <div className="pb-20">
    <Outlet />
    <TabBar
      items={[
        { icon: '☰', label: 'Столы', to: '/waiter' },
        { icon: '🔔', label: 'Заявки', to: '/waiter/requests' },
        { icon: '👤', label: 'Профиль', to: '/waiter/profile' },
      ]}
    />
  </div>
)
