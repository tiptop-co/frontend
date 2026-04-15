import { useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useOrder } from '@/features/order'
import { useCreateTransaction } from '@/features/payment'

const TIP_PRESETS = [
  { label: 'Без', value: 0 },
  { label: '5%', value: 5 },
  { label: '10%', value: 10 },
  { label: '15%', value: 15 },
]

export const GuestPaymentPage = () => {
  const { tableId } = useParams<{ tableId: string }>()
  const navigate = useNavigate()
  const { data: order } = useOrder(tableId!)
  const { mutate: pay, isPending } = useCreateTransaction(tableId!)

  const unpaidItems = useMemo(
    () => order?.items.filter((i) => i.status === 'unpaid') ?? [],
    [order],
  )

  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(unpaidItems.map((i) => i.id)),
  )
  const [tipPercent, setTipPercent] = useState(10)
  const [customTip, setCustomTip] = useState<number | null>(null)

  const toggle = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  const itemsTotal = unpaidItems
    .filter((i) => selected.has(i.id))
    .reduce((s, i) => s + i.price, 0)

  const tipsAmount =
    customTip !== null ? customTip : Math.round(itemsTotal * (tipPercent / 100))
  const total = itemsTotal + tipsAmount

  const handlePay = () => {
    if (!order || selected.size === 0) return
    pay(
      {
        orderId: order.id,
        itemIds: [...selected],
        tipsAmount,
      },
      {
        onSuccess: () => navigate(`/table/${tableId}/order`),
      },
    )
  }

  if (!order) return null

  return (
    <>
      <div className="sticky top-0 z-10 bg-cream px-5 py-4 border-b border-muted-bg flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-[22px] text-ink bg-transparent border-none cursor-pointer"
        >
          &larr;
        </button>
        <h1 className="text-xl font-bold">Оплата</h1>
      </div>

      <div className="p-4">
        <div className="text-[15px] font-semibold mb-2.5">
          Выберите позиции к оплате
        </div>
        <div className="bg-white rounded-[14px] p-3.5 px-4 shadow-card">
          {unpaidItems.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 py-2.5 border-b border-muted-bg last:border-none cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.has(item.id)}
                onChange={() => toggle(item.id)}
                className="w-[22px] h-[22px] accent-terra flex-shrink-0"
              />
              <span className="flex-1 text-sm">
                {item.dishName}
                {item.quantity > 1 ? ` × ${item.quantity}` : ''}
              </span>
              <span className="text-sm font-semibold whitespace-nowrap">
                {item.price.toLocaleString('ru-RU')}&nbsp;₽
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="px-4">
        <div className="text-[15px] font-semibold mb-2.5">Чаевые</div>
        <div className="bg-white rounded-[14px] p-3.5 px-4 shadow-card">
          <div className="flex gap-2 flex-wrap mb-2.5">
            {TIP_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => {
                  setTipPercent(preset.value)
                  setCustomTip(null)
                }}
                className={`px-3.5 py-2 rounded-full text-sm font-medium border-[1.5px] cursor-pointer ${
                  customTip === null && tipPercent === preset.value
                    ? 'bg-terra text-white border-terra'
                    : 'bg-white text-ink border-muted-bg'
                }`}
              >
                {preset.label}
              </button>
            ))}
            <button
              onClick={() => setCustomTip(customTip !== null ? null : 0)}
              className={`px-3.5 py-2 rounded-full text-sm font-medium border-[1.5px] cursor-pointer ${
                customTip !== null
                  ? 'bg-terra text-white border-terra'
                  : 'bg-white text-ink border-muted-bg'
              }`}
            >
              Другая сумма
            </button>
          </div>

          {customTip !== null && (
            <input
              type="number"
              min={0}
              value={customTip}
              onChange={(e) => setCustomTip(Math.max(0, Number(e.target.value)))}
              placeholder="Сумма чаевых"
              className="w-full py-2.5 px-3 border border-muted-bg rounded-lg text-sm mb-2.5 outline-none focus:border-terra"
            />
          )}

          <div className="text-sm text-ink">
            Чаевые: {tipsAmount.toLocaleString('ru-RU')}&nbsp;₽
          </div>
          <div className="text-xs text-[#999]">
            Чаевые адресуются вашему официанту
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-[14px] p-4 shadow-card">
          <div className="flex justify-between text-sm text-[#666] mb-2">
            <span>Позиции</span>
            <span>{itemsTotal.toLocaleString('ru-RU')}&nbsp;₽</span>
          </div>
          <div className="flex justify-between text-sm text-[#666] mb-2">
            <span>Чаевые</span>
            <span>{tipsAmount.toLocaleString('ru-RU')}&nbsp;₽</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t border-muted-bg pt-2.5 mt-1">
            <span>Итого</span>
            <span>{total.toLocaleString('ru-RU')}&nbsp;₽</span>
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={isPending || selected.size === 0}
          className="w-full mt-4 py-4 bg-terra text-white border-none rounded-[14px] text-[17px] font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending
            ? 'Обработка...'
            : `Оплатить ${total.toLocaleString('ru-RU')} ₽`}
        </button>
      </div>
    </>
  )
}
