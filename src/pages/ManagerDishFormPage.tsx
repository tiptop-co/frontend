import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCreateDish, useManagerMenu } from '@/features/manager'
import { useDish } from '@/features/menu'

export const ManagerDishFormPage = () => {
  const { dishId } = useParams<{ dishId: string }>()
  const navigate = useNavigate()
  const isNew = dishId === 'new'
  const { data: menuData } = useManagerMenu()
  const { data: existingDish } = useDish(isNew ? '' : dishId!)
  const { mutate: create, isPending } = useCreateDish()

  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [weight, setWeight] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [fat, setFat] = useState('')
  const [carbs, setCarbs] = useState('')

  useEffect(() => {
    if (existingDish && !isNew) {
      setName(existingDish.name)
      setCategoryId(existingDish.categoryId)
      setDescription(existingDish.description)
      setPrice(String(existingDish.price))
      setWeight(String(existingDish.weight))
      setCalories(existingDish.calories != null ? String(existingDish.calories) : '')
      setProtein(existingDish.protein != null ? String(existingDish.protein) : '')
      setFat(existingDish.fat != null ? String(existingDish.fat) : '')
      setCarbs(existingDish.carbs != null ? String(existingDish.carbs) : '')
    }
  }, [existingDish, isNew])

  const handleSave = () => {
    create(
      {
        name,
        categoryId,
        description,
        price: Number(price),
        weight: Number(weight),
        weightUnit: 'г',
        calories: calories ? Number(calories) : undefined,
        protein: protein ? Number(protein) : undefined,
        fat: fat ? Number(fat) : undefined,
        carbs: carbs ? Number(carbs) : undefined,
      },
      { onSuccess: () => navigate('/manager') },
    )
  }

  return (
    <>
      <div className="bg-white px-4 py-5 pb-3 border-b border-muted-bg flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-[22px] text-ink bg-transparent border-none cursor-pointer">
          ‹
        </button>
        <h1 className="text-xl font-bold">{isNew ? 'Новое блюдо' : 'Редактирование'}</h1>
      </div>

      <div className="px-4 pt-5 flex flex-col gap-[18px]">
        <FormField label="Название" value={name} onChange={setName} placeholder="Борщ с говядиной" />

        <div>
          <label className="block text-[13px] font-semibold text-[#666] mb-1.5">Категория</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full py-3 px-3.5 border border-muted-bg rounded-[10px] text-[15px] text-ink bg-white outline-none focus:border-terra font-sans"
          >
            <option value="">Выберите категорию</option>
            {menuData?.categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <FormField label="Описание" value={description} onChange={setDescription} placeholder="Классический борщ..." multiline />

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Стоимость, ₽" value={price} onChange={setPrice} placeholder="420" type="number" />
          <FormField label="Вес, г" value={weight} onChange={setWeight} placeholder="350" type="number" />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-[#666] mb-1.5">КБЖУ</label>
          <div className="grid grid-cols-4 gap-2">
            <MiniField label="Ккал" value={calories} onChange={setCalories} placeholder="245" />
            <MiniField label="Белки (г)" value={protein} onChange={setProtein} placeholder="12" />
            <MiniField label="Жиры (г)" value={fat} onChange={setFat} placeholder="8" />
            <MiniField label="Углеводы (г)" value={carbs} onChange={setCarbs} placeholder="28" />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isPending || !name || !categoryId}
          className="w-full py-3.5 bg-terra text-white border-none rounded-xl text-base font-semibold cursor-pointer mt-2 disabled:opacity-50"
        >
          {isPending ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>
    </>
  )
}

const FormField = ({ label, value, onChange, placeholder, type = 'text', multiline }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; multiline?: boolean
}) => (
  <div>
    <label className="block text-[13px] font-semibold text-[#666] mb-1.5">{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full py-3 px-3.5 border border-muted-bg rounded-[10px] text-[15px] text-ink bg-white outline-none focus:border-terra font-sans resize-y min-h-[80px]"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full py-3 px-3.5 border border-muted-bg rounded-[10px] text-[15px] text-ink bg-white outline-none focus:border-terra font-sans"
      />
    )}
  </div>
)

const MiniField = ({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string
}) => (
  <div>
    <label className="block text-[11px] font-semibold text-[#666] mb-1">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full py-2.5 px-2 border border-muted-bg rounded-[10px] text-sm text-ink bg-white outline-none focus:border-terra font-sans"
    />
  </div>
)
