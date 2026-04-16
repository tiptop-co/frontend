import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useOrder } from '@/features/order'
import { Badge } from '@/shared/ui'
import type { OrderItem } from '@/shared/types'

export const GuestOrderPage = () => {
  const { tableId } = useParams<{ tableId: string }>()
  const navigate = useNavigate()
  const { data: order, isLoading, isError } = useOrder(tableId!)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  if (isLoading) {
    return <p className="text-muted text-center py-20">Загрузка...</p>
  }

  if (isError || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <p className="text-muted text-lg mb-4">Нет активного заказа</p>
        <button
          onClick={() => navigate(`/table/${tableId}`)}
          className="text-terra font-semibold bg-transparent border-none cursor-pointer"
        >
          Перейти в меню
        </button>
      </div>
    )
  }

  const unpaidItems = order.items.filter((i) => i.status === 'unpaid')
  const unpaidAmount = order.totalAmount - order.paidAmount
  const regularItems = order.items.filter((i) => !i.addedLater)
  const laterItems = order.items.filter((i) => i.addedLater)

  const toggle = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  const selectedTotal = unpaidItems
    .filter((i) => selected.has(i.id))
    .reduce((s, i) => s + i.price, 0)

  const handlePay = () => {
    const ids = [...selected].join(',')
    navigate(`/table/${tableId}/payment?items=${ids}`)
  }

  return (
    <>
      <div className="sticky top-0 z-10 bg-cream px-5 py-4 border-b border-muted-bg">
        <h1 className="text-xl font-bold">Мой заказ</h1>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-[14px] p-4 shadow-card">
          <div className="flex justify-between items-center mb-3.5">
            <Badge label="В процессе" variant="active" />
            <span className="text-[13px] text-muted">
              Стол {tableId} &middot; с{' '}
              {new Date(order.createdAt).toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>

          <div className="flex flex-col">
            {regularItems.map((item) => (
              <OrderItemRow
                key={item.id}
                item={item}
                checked={selected.has(item.id)}
                onToggle={() => toggle(item.id)}
              />
            ))}

            {laterItems.length > 0 && (
              <>
                <div className="text-[11px] text-muted pt-2.5 pb-1 border-b border-muted-light">
                  Добавлено позже
                </div>
                {laterItems.map((item) => (
                  <OrderItemRow
                    key={item.id}
                    item={item}
                    checked={selected.has(item.id)}
                    onToggle={() => toggle(item.id)}
                  />
                ))}
              </>
            )}
          </div>

          {order.wishes && (
            <div className="mt-3 p-3 bg-cream rounded-xl text-sm text-[#666] leading-relaxed">
              <span className="text-muted text-xs font-semibold block mb-1">Пожелания</span>
              {order.wishes}
            </div>
          )}

          <hr className="border-none border-t border-muted-bg my-3" />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted">Итого</span>
            <span className="text-base font-bold">
              {order.totalAmount.toLocaleString('ru-RU')} ₽
            </span>
          </div>
          <div className="flex justify-between text-[13px] text-muted mt-1.5">
            <span>Оплачено: {order.paidAmount.toLocaleString('ru-RU')} ₽</span>
            <span>К оплате: {unpaidAmount.toLocaleString('ru-RU')} ₽</span>
          </div>

          {unpaidAmount > 0 && (
            <button
              onClick={handlePay}
              disabled={selected.size === 0}
              className="w-full mt-3.5 py-3.5 bg-terra text-white border-none rounded-xl text-base font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selected.size > 0
                ? `Оплатить выбранное — ${selectedTotal.toLocaleString('ru-RU')} ₽`
                : 'Выберите позиции для оплаты'}
            </button>
          )}
        </div>
      </div>
    </>
  )
}

const OrderItemRow = ({
  item,
  checked,
  onToggle,
}: {
  item: OrderItem
  checked: boolean
  onToggle: () => void
}) => {
  const isPaid = item.status === 'paid'
  return (
    <div
      className={`flex items-center gap-2.5 text-sm py-2 ${
        isPaid
          ? 'text-forest border-b border-muted-light last:border-none'
          : 'text-danger bg-danger-light -mx-2 px-2 rounded-md mb-0.5'
      }`}
    >
      {!isPaid && (
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="w-[18px] h-[18px] accent-terra flex-shrink-0"
        />
      )}
      <span className="flex-1">
        {isPaid && '✓ '}
        {item.dishName} &times; {item.quantity}
      </span>
      <span className="whitespace-nowrap ml-3">
        {item.price.toLocaleString('ru-RU')} ₽
      </span>
    </div>
  )
}
