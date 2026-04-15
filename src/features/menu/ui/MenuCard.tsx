import type { Dish } from '@/shared/types'

interface MenuCardProps {
  dish: Dish
  onAdd: () => void
  onTap: () => void
}

export const MenuCard = ({ dish, onAdd, onTap }: MenuCardProps) => (
  <div
    onClick={onTap}
    className="bg-white rounded-[14px] p-3.5 px-4 shadow-card flex justify-between items-start gap-3 cursor-pointer"
  >
    <div className="flex-1 min-w-0">
      <div className="text-base font-semibold mb-1">{dish.name}</div>
      <div className="text-[13px] text-[#888] leading-snug line-clamp-2 mb-1.5">
        {dish.description}
      </div>
      <div className="flex items-center gap-2.5">
        <span className="text-xs text-[#aaa]">
          {dish.weight} {dish.weightUnit}
        </span>
        <span className="text-base font-bold text-terra">{dish.price} ₽</span>
      </div>
    </div>
    <div className="flex flex-col items-end justify-end self-stretch">
      <button
        onClick={(e) => {
          e.stopPropagation()
          onAdd()
        }}
        className="w-9 h-9 rounded-full border-none bg-terra text-white text-[22px] font-normal cursor-pointer flex items-center justify-center leading-none"
      >
        +
      </button>
    </div>
  </div>
)
