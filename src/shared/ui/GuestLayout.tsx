import { Outlet, useParams } from 'react-router-dom'
import { TabBar } from './TabBar'

export const GuestLayout = () => {
  const { tableId } = useParams<{ tableId: string }>()
  const base = `/table/${tableId}`

  return (
    <div className="pb-[140px]">
      <Outlet />
      <TabBar
        items={[
          { icon: '☰', label: 'Меню', to: base },
          { icon: '🛒', label: 'Корзина', to: `${base}/cart` },
          { icon: '📋', label: 'Заказ', to: `${base}/order` },
          { icon: '🔔', label: 'Вызов', to: `${base}/call` },
        ]}
      />
    </div>
  )
}
