import { useNavigate } from 'react-router-dom'
import { useManagerMenu, useDeleteDish } from '@/features/manager'
import { confirm } from '@/shared/ui/ConfirmDialog'
import { useState } from 'react'

export const ManagerMenuPage = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useManagerMenu()
  const { mutate: deleteDish } = useDeleteDish()
  const [categoryId, setCategoryId] = useState<string | 'all'>('all')

  const filtered =
    categoryId === 'all'
      ? data?.dishes
      : data?.dishes.filter((d) => d.categoryId === categoryId)

  const handleDelete = async (id: string, name: string) => {
    if (await confirm('Удаление блюда', `Удалить блюдо «${name}»?`)) {
      deleteDish(id)
    }
  }

  return (
    <>
      <div className="bg-white px-4 py-5 pb-3 border-b border-muted-bg">
        <h1 className="text-[22px] font-bold">Меню</h1>
        <div className="text-[13px] text-[#888] mt-0.5">Гастроном</div>
      </div>

      <button
        onClick={() => navigate('/manager/dish/new')}
        className="flex items-center justify-center gap-1.5 mx-4 mt-4 py-2.5 px-4 border-[1.5px] border-terra rounded-[10px] bg-transparent text-terra text-[15px] font-semibold cursor-pointer w-[calc(100%-32px)]"
      >
        + Добавить блюдо
      </button>

      {data && (
        <div className="flex gap-2 px-4 pt-3.5 pb-0 overflow-x-auto scrollbar-none">
          <Chip label="Все" active={categoryId === 'all'} onClick={() => setCategoryId('all')} />
          {data.categories.map((cat) => (
            <Chip key={cat.id} label={cat.name} active={categoryId === cat.id} onClick={() => setCategoryId(cat.id)} />
          ))}
        </div>
      )}

      <div className="px-4 pt-3 flex flex-col gap-2.5">
        {isLoading && <p className="text-muted text-center py-10">Загрузка...</p>}
        {filtered?.map((dish) => (
          <div
            key={dish.id}
            onClick={() => navigate(`/manager/dish/${dish.id}`)}
            className="bg-white rounded-xl p-3.5 px-4 shadow-card flex items-center justify-between cursor-pointer active:opacity-95"
          >
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-semibold">{dish.name}</div>
              <div className="text-[13px] text-[#888] mt-1 flex gap-2.5 items-center">
                <span className="inline-block text-[11px] px-2 py-0.5 rounded-[10px] bg-muted-bg text-[#666]">
                  {dish.categoryName}
                </span>
                {dish.price} ₽ · {dish.weight} {dish.weightUnit}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDelete(dish.id, dish.name)
              }}
              className="bg-transparent border-none cursor-pointer text-danger text-lg ml-3 flex-shrink-0"
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

const Chip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[13px] border-none cursor-pointer ${
      active ? 'bg-terra text-white' : 'bg-muted-bg text-ink'
    }`}
  >
    {label}
  </button>
)
