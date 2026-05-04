import { useEffect, useState } from 'react'
import {
  Outlet,
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import { TabBar } from './TabBar'
import { useBootstrapTable } from '@/features/menu'

export const GuestLayout = () => {
  const { tableId } = useParams<{ tableId: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const base = `/table/${tableId}`

  const qrToken = searchParams.get('qr')

  const [ready, setReady] = useState(!qrToken)
  const [error, setError] = useState<string | null>(null)
  const bootstrap = useBootstrapTable()

  useEffect(() => {
    if (!tableId || !qrToken) return

    bootstrap.mutate(qrToken, {
      onSuccess: () => {
        setReady(true)
        const next = new URLSearchParams(searchParams)
        next.delete('qr')
        navigate(
          { pathname: location.pathname, search: next.toString() },
          { replace: true },
        )
      },
      onError: (e) => {
        setError(e instanceof Error ? e.message : 'Не удалось открыть стол')
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId, qrToken])

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 font-semibold mb-2">Ошибка</p>
        <p className="text-sm text-muted">{error}</p>
      </div>
    )
  }

  if (!ready) {
    return <p className="text-muted text-center py-10">Открываем стол…</p>
  }

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
