import { useState, useEffect } from 'react'
import { useVenue, useUpdateVenue } from '@/features/manager'

export const ManagerVenuePage = () => {
  const { data: venue, isLoading } = useVenue()
  const { mutate: update, isPending } = useUpdateVenue()

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [bankAccount, setBankAccount] = useState('')

  useEffect(() => {
    if (venue) {
      setName(venue.name)
      setAddress(venue.address)
      setDescription(venue.description ?? '')
      setBankAccount(venue.bankAccount ?? '')
    }
  }, [venue])

  if (isLoading) {
    return <p className="text-muted text-center py-20">Загрузка...</p>
  }

  const handleSave = () => {
    update({ name, address, description, bankAccount })
  }

  return (
    <>
      <div className="bg-white px-4 py-5 pb-3 border-b border-muted-bg">
        <h1 className="text-xl font-bold">Заведение</h1>
      </div>

      <div className="px-4 pt-5 flex flex-col gap-[18px]">
        <Field label="Название" value={name} onChange={setName} />
        <Field label="Адрес" value={address} onChange={setAddress} />
        <Field label="Описание" value={description} onChange={setDescription} multiline />
        <Field label="Расчётный счёт" value={bankAccount} onChange={setBankAccount} />

        <button
          onClick={handleSave}
          disabled={isPending}
          className="w-full py-3.5 bg-terra text-white border-none rounded-xl text-base font-semibold cursor-pointer mt-2 disabled:opacity-50"
        >
          {isPending ? 'Сохранение...' : 'Сохранить изменения'}
        </button>
      </div>
    </>
  )
}

const Field = ({ label, value, onChange, multiline }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean
}) => (
  <div>
    <label className="block text-[13px] font-semibold text-[#666] mb-1.5">{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-3 px-3.5 border border-muted-bg rounded-[10px] text-[15px] text-ink bg-white outline-none focus:border-terra font-sans resize-y min-h-[80px]"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-3 px-3.5 border border-muted-bg rounded-[10px] text-[15px] text-ink bg-white outline-none focus:border-terra font-sans"
      />
    )}
  </div>
)
