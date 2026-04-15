import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDish } from '@/features/menu'
import { useCartStore } from '@/features/cart'

export const GuestDishPage = () => {
  const { tableId, dishId } = useParams<{ tableId: string; dishId: string }>()
  const navigate = useNavigate()
  const { data: dish, isLoading } = useDish(dishId!)
  const addItem = useCartStore((s) => s.addItem)
  const [qty, setQty] = useState(1)

  if (isLoading || !dish) {
    return <p className="text-muted text-center py-20">Загрузка...</p>
  }

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(dish)
    navigate(`/table/${tableId}`)
  }

  return (
    <>
      <div className="p-3.5 px-4">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full border-none bg-muted-bg text-lg cursor-pointer text-ink flex items-center justify-center"
        >
          &larr;
        </button>
      </div>

      <div className="w-full h-[200px] bg-muted-bg flex items-center justify-center text-5xl text-[#ccc]">
        🍲
      </div>

      <div className="p-5 px-4">
        <span className="inline-block bg-forest text-white px-3 py-1 rounded-xl text-xs font-semibold mb-2.5">
          {dish.categoryName}
        </span>
        <h1 className="text-2xl font-bold mb-2">{dish.name}</h1>
        <div className="text-[22px] font-bold text-terra mb-4">
          {dish.price} ₽
        </div>
        <p className="text-[15px] leading-relaxed text-[#666] mb-5">
          {dish.description}
        </p>

        <div className="grid grid-cols-2 gap-2.5 mb-6">
          <InfoCell label="Вес" value={`${dish.weight} ${dish.weightUnit}`} />
          {dish.calories != null && (
            <InfoCell label="Калории" value={`${dish.calories} ккал`} />
          )}
          {dish.protein != null && (
            <InfoCell label="Белки" value={`${dish.protein} г`} />
          )}
          {dish.fat != null && (
            <InfoCell label="Жиры" value={`${dish.fat} г`} />
          )}
          {dish.carbs != null && (
            <InfoCell
              label="Углеводы"
              value={`${dish.carbs} г`}
              wide={
                [dish.calories, dish.protein, dish.fat].filter(
                  (v) => v != null,
                ).length %
                  2 ===
                0
              }
            />
          )}
        </div>

        <div className="flex items-center justify-center gap-5 mb-5">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-10 h-10 rounded-full border border-muted-bg bg-white text-xl cursor-pointer text-ink flex items-center justify-center"
          >
            −
          </button>
          <span className="text-xl font-bold min-w-[28px] text-center">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-10 h-10 rounded-full border border-muted-bg bg-white text-xl cursor-pointer text-ink flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="fixed bottom-[72px] left-1/2 -translate-x-1/2 max-w-[398px] w-[calc(100%-32px)] bg-terra text-white border-none rounded-[14px] py-4 text-base font-semibold cursor-pointer text-center shadow-[0_4px_16px_rgba(194,112,62,0.35)] z-20"
      >
        Добавить в корзину — {(dish.price * qty).toLocaleString('ru-RU')} ₽
      </button>
    </>
  )
}

const InfoCell = ({
  label,
  value,
  wide,
}: {
  label: string
  value: string
  wide?: boolean
}) => (
  <div
    className={`bg-white rounded-xl p-3 shadow-card ${wide ? 'col-span-2' : ''}`}
  >
    <div className="text-xs text-[#aaa] mb-0.5">{label}</div>
    <div className="text-[15px] font-semibold">{value}</div>
  </div>
)
