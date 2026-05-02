import { useNavigate } from 'react-router-dom'
import { useWaiterTables, useWaiterCompletedOrders } from '@/features/waiter'
import { useAuthStore } from '@/features/auth'
import { Badge } from '@/shared/ui'
import type { Table } from '@/shared/types'

const STATUS_BADGE: Record<Table['status'], { label: string; variant: 'unpaid' | 'paid' | 'free' }> = {
  unpaid: { label: 'Не оплачен', variant: 'unpaid' },
  paid: { label: 'Оплачен', variant: 'paid' },
  free: { label: 'Свободен', variant: 'free' },
}

export const WaiterTablesPage = () => {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const { data, isLoading } = useWaiterTables()
  const { data: completed } = useWaiterCompletedOrders()

  if (isLoading) {
    return <p className="text-muted text-center py-20">Загрузка...</p>
  }

  return (
    <>
      <div className="sticky top-0 z-10 bg-cream px-5 pt-4 pb-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Мои столы</h1>
        <div className="flex items-center gap-2.5 text-sm text-muted">
          {user?.firstName} {user?.lastName?.charAt(0)}.
          <div className="w-9 h-9 rounded-full bg-terra text-white flex items-center justify-center text-sm font-semibold">
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </div>
        </div>
      </div>

      <div className="text-[13px] font-semibold text-muted uppercase tracking-wide px-5 pt-4 pb-2">
        Активные
      </div>
      <div className="px-5 flex flex-col gap-2.5">
        {data?.tables.map((table) => {
          const badge = STATUS_BADGE[table.status]
          return (
            <div
              key={table.id}
              onClick={() => navigate(`/waiter/table/${table.id}`)}
              className="bg-white rounded-[14px] p-4 px-[18px] shadow-card flex items-center gap-3.5 relative cursor-pointer active:opacity-95"
            >
              {table.hasActiveRequest && (
                <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-danger rounded-full" />
              )}
              <div className="w-[52px] h-[52px] rounded-xl bg-muted-bg flex items-center justify-center text-[22px] font-bold flex-shrink-0">
                {table.number}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base font-semibold">
                    Стол {table.number}
                  </span>
                  <Badge label={badge.label} variant={badge.variant} />
                </div>
                <div className="text-[13px] text-muted">
                  {table.status === 'free'
                    ? 'Нет заказа'
                    : `${table.itemCount ?? 0} позиций · ${(table.totalAmount ?? 0).toLocaleString('ru-RU')} ₽`}
                </div>
              </div>
              <span className="text-[#C4BFB7] text-xl flex-shrink-0">›</span>
            </div>
          )
        })}
      </div>

      {completed && completed.length > 0 && (
        <>
          <div className="text-[13px] font-semibold text-muted uppercase tracking-wide px-5 pt-6 pb-2">
            Завершённые
          </div>
          <div className="px-5 flex flex-col gap-2.5 pb-6">
            {completed.map((o) => (
              <div
                key={o.orderId}
                className="bg-white rounded-[14px] p-3.5 px-[18px] shadow-card flex items-center gap-3.5"
              >
                <div className="w-[44px] h-[44px] rounded-xl bg-cream flex items-center justify-center text-[16px] font-bold text-muted flex-shrink-0">
                  {o.tableNumber}
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-semibold">
                    Стол {o.tableNumber}
                  </div>
                  <div className="text-[12px] text-muted">
                    {new Date(o.completedAt).toLocaleString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    · {o.itemsCount} поз.
                  </div>
                </div>
                <div className="text-[14px] font-bold text-forest">
                  {o.totalAmount.toLocaleString('ru-RU')} ₽
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}
