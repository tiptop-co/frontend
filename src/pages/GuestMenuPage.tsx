import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMenu } from '@/features/menu'
import { useCartStore } from '@/features/cart'
import { CategoryFilter } from '@/features/menu/ui/CategoryFilter'
import { MenuCard } from '@/features/menu/ui/MenuCard'

export const GuestMenuPage = () => {
  const { tableId } = useParams<{ tableId: string }>()
  const navigate = useNavigate()
  const { data, isLoading } = useMenu(tableId!)
  const [categoryId, setCategoryId] = useState<string | 'all'>('all')
  const addItem = useCartStore((s) => s.addItem)
  const totalItems = useCartStore((s) => s.totalItems())
  const totalPrice = useCartStore((s) => s.totalPrice())

  const filtered =
    categoryId === 'all'
      ? data?.dishes
      : data?.dishes.filter((d) => d.categoryId === categoryId)

  return (
    <>
      <div className="sticky top-0 z-10 bg-cream px-4 pt-4">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-[22px] font-bold">Гастроном</h1>
          <span className="bg-muted-bg px-3 py-1 rounded-xl text-[13px] font-semibold text-forest">
            Стол {tableId}
          </span>
        </div>
        {data && (
          <CategoryFilter
            categories={data.categories}
            selected={categoryId}
            onChange={setCategoryId}
          />
        )}
      </div>

      <div className="px-4 flex flex-col gap-3">
        {isLoading && (
          <p className="text-muted text-center py-10">Загрузка меню...</p>
        )}
        {filtered?.map((dish) => (
          <MenuCard
            key={dish.id}
            dish={dish}
            onAdd={() => addItem(dish)}
            onTap={() => navigate(`/table/${tableId}/dish/${dish.id}`)}
          />
        ))}
      </div>

      {totalItems > 0 && (
        <div
          onClick={() => navigate(`/table/${tableId}/cart`)}
          className="fixed bottom-[72px] left-1/2 -translate-x-1/2 max-w-[398px] w-[calc(100%-32px)] bg-terra text-white rounded-[14px] py-3.5 px-5 text-[15px] font-semibold flex justify-center items-center gap-1.5 shadow-[0_4px_16px_rgba(194,112,62,0.35)] cursor-pointer z-20"
        >
          Корзина &middot; {totalItems} &middot;{' '}
          {totalPrice.toLocaleString('ru-RU')} ₽
        </div>
      )}
    </>
  )
}
