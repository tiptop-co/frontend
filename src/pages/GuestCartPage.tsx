import { useNavigate, useParams } from 'react-router-dom'
import { useCartStore } from '@/features/cart'
import { useCreateOrder } from '@/features/order'

export const GuestCartPage = () => {
  const { tableId } = useParams<{ tableId: string }>()
  const navigate = useNavigate()
  const items = useCartStore((s) => s.items)
  const wishes = useCartStore((s) => s.wishes)
  const setWishes = useCartStore((s) => s.setWishes)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const clear = useCartStore((s) => s.clear)
  const totalPrice = useCartStore((s) => s.totalPrice())
  const createOrder = useCreateOrder()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <p className="text-muted text-lg mb-4">Корзина пуста</p>
        <button
          onClick={() => navigate(`/table/${tableId}`)}
          className="text-terra font-semibold text-base bg-transparent border-none cursor-pointer"
        >
          Перейти в меню
        </button>
      </div>
    )
  }

  const handleOrder = () => {
    if (!tableId || createOrder.isPending) return
    createOrder.mutate(
      {
        tableId,
        items: items.map(({ dish, quantity }) => ({
          dishId: dish.id,
          quantity,
        })),
        wishes: wishes.trim() ? wishes.trim() : undefined,
      },
      {
        onSuccess: () => {
          clear()
          navigate(`/table/${tableId}/order`)
        },
      },
    )
  }

  return (
    <>
      <div className="px-4 pt-4">
        <h1 className="text-[22px] font-bold">Корзина</h1>
      </div>

      <div className="px-4 pt-4 flex flex-col gap-3">
        {items.map(({ dish, quantity }) => (
          <div
            key={dish.id}
            className="bg-white rounded-[14px] p-3.5 px-4 shadow-card"
          >
            <div className="flex justify-between items-start mb-2.5">
              <div>
                <div className="text-base font-semibold">{dish.name}</div>
                <div className="text-[13px] text-[#888]">
                  {dish.price} ₽ за шт.
                </div>
              </div>
              <button
                onClick={() => removeItem(dish.id)}
                className="bg-transparent border-none text-danger text-lg cursor-pointer pl-2 leading-none"
              >
                ✕
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(dish.id, quantity - 1)}
                  className="w-8 h-8 rounded-full border border-muted-bg bg-white text-base cursor-pointer text-ink flex items-center justify-center"
                >
                  −
                </button>
                <span className="text-base font-bold min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(dish.id, quantity + 1)}
                  className="w-8 h-8 rounded-full border border-muted-bg bg-white text-base cursor-pointer text-ink flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <span className="text-base font-bold text-terra">
                {(dish.price * quantity).toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-5">
        <textarea
          value={wishes}
          onChange={(e) => setWishes(e.target.value)}
          placeholder="Без лука, аллергия на орехи..."
          className="w-full min-h-[80px] border border-muted-bg rounded-xl p-3 text-sm font-sans bg-white resize-y text-ink placeholder:text-[#bbb]"
        />
      </div>

      <div className="mx-4 mt-5 p-4 bg-white rounded-[14px] shadow-card flex justify-between items-center">
        <span className="text-base font-semibold">Итого</span>
        <span className="text-xl font-bold text-terra">
          {totalPrice.toLocaleString('ru-RU')} ₽
        </span>
      </div>

      {createOrder.isError && (
        <p className="px-4 mt-3 text-sm text-danger text-center">
          Не удалось оформить заказ. Попробуйте ещё раз.
        </p>
      )}
      <button
        onClick={handleOrder}
        disabled={createOrder.isPending}
        className="fixed bottom-[72px] left-1/2 -translate-x-1/2 max-w-[398px] w-[calc(100%-32px)] bg-terra text-white border-none rounded-[14px] py-4 text-base font-semibold cursor-pointer text-center shadow-[0_4px_16px_rgba(194,112,62,0.35)] z-20 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {createOrder.isPending ? 'Отправляем…' : 'Заказать'}
      </button>
    </>
  )
}
