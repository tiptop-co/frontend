import type { MenuCategory } from '@/shared/types'

interface CategoryFilterProps {
  categories: MenuCategory[]
  selected: string | 'all'
  onChange: (categoryId: string | 'all') => void
}

export const CategoryFilter = ({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) => (
  <div className="flex gap-2 overflow-x-auto pb-3.5 scrollbar-none">
    <button
      onClick={() => onChange('all')}
      className={`flex-shrink-0 px-4 py-[7px] rounded-full text-sm font-medium border whitespace-nowrap transition-colors ${
        selected === 'all'
          ? 'bg-terra text-white border-terra'
          : 'bg-white text-ink border-muted-bg'
      }`}
    >
      Все
    </button>
    {categories.map((cat) => (
      <button
        key={cat.id}
        onClick={() => onChange(cat.id)}
        className={`flex-shrink-0 px-4 py-[7px] rounded-full text-sm font-medium border whitespace-nowrap transition-colors ${
          selected === cat.id
            ? 'bg-terra text-white border-terra'
            : 'bg-white text-ink border-muted-bg'
        }`}
      >
        {cat.name}
      </button>
    ))}
  </div>
)
