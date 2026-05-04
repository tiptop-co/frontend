import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateManager, useAdminVenues } from '@/features/admin'
import { PhoneInput } from '@/shared/ui/PhoneInput'
import { Dropdown, type DropdownGroup } from '@/shared/ui'

export const AdminAddManagerPage = () => {
  const navigate = useNavigate()
  const { mutate: create, isPending } = useCreateManager()
  const { data: venues, isLoading: venuesLoading } = useAdminVenues()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [venueId, setVenueId] = useState<string>('')

  const handleSave = () => {
    create(
      {
        firstName,
        lastName,
        phone,
        role: 'manager',
        venueId: venueId || undefined,
      },
      { onSuccess: () => navigate('/admin') },
    )
  }

  const groups: DropdownGroup[] = [
    { options: [{ value: '', label: 'Без заведения' }] },
  ]
  if ((venues ?? []).length > 0) {
    groups.push({
      label: 'Заведения',
      options: (venues ?? []).map((v) => ({
        value: v.id,
        label: v.name,
        hint: v.address,
      })),
    })
  }

  return (
    <>
      <div className="bg-white px-5 py-4 border-b border-muted-bg flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-[22px] text-ink bg-transparent border-none cursor-pointer"
        >
          ‹
        </button>
        <h1 className="text-xl font-bold">Новый менеджер</h1>
      </div>

      <div className="px-4 pt-5 flex flex-col gap-[18px]">
        <Field
          label="Имя"
          value={firstName}
          onChange={setFirstName}
          placeholder="Иван"
        />
        <Field
          label="Фамилия"
          value={lastName}
          onChange={setLastName}
          placeholder="Петров"
        />
        <div>
          <label className="block text-[13px] font-semibold text-[#666] mb-1.5">
            Телефон
          </label>
          <PhoneInput value={phone} onChange={setPhone} />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-[#666] mb-1.5">
            Заведение
          </label>
          <Dropdown
            value={venueId}
            groups={groups}
            onChange={setVenueId}
            disabled={venuesLoading}
            placeholder={venuesLoading ? 'Загружаем…' : 'Выберите заведение'}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={isPending || !firstName || !phone}
          className="w-full py-3.5 bg-terra text-white border-none rounded-xl text-base font-semibold cursor-pointer mt-2 disabled:opacity-50"
        >
          {isPending ? 'Создание...' : 'Создать аккаунт'}
        </button>
        <p className="text-xs text-muted text-center">
          Пароль будет сгенерирован автоматически
        </p>
      </div>
    </>
  )
}

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) => (
  <div>
    <label className="block text-[13px] font-semibold text-[#666] mb-1.5">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full py-3 px-3.5 border border-muted-bg rounded-[10px] text-[15px] text-ink bg-white outline-none focus:border-terra font-sans"
    />
  </div>
)
