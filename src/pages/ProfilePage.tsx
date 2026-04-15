import { useState } from 'react'
import { useAuthStore } from '@/features/auth'
import { useTodayTips } from '@/features/waiter'
import { useUpdateProfile, useChangePassword } from '@/features/profile'
import { useNavigate } from 'react-router-dom'

export const ProfilePage = () => {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const { data: tipsData } = useTodayTips()
  const { mutate: updateProfile } = useUpdateProfile()
  const { mutate: changePassword } = useChangePassword()

  const [firstName, setFirstName] = useState(user?.firstName ?? '')
  const [lastName, setLastName] = useState(user?.lastName ?? '')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const handleSave = () => {
    updateProfile({ firstName, lastName })
  }

  const handleChangePassword = () => {
    if (newPassword && newPassword === repeatPassword) {
      changePassword({ currentPassword, newPassword })
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const initials = `${user?.firstName?.charAt(0) ?? ''}${user?.lastName?.charAt(0) ?? ''}`

  return (
    <>
      <div className="sticky top-0 z-10 bg-cream px-5 pt-4 pb-3">
        <h1 className="text-2xl font-bold">Профиль</h1>
      </div>

      <div className="px-5">
        <div className="flex items-center gap-4 bg-white rounded-[14px] p-5 px-[18px] shadow-card mb-6">
          <div className="w-14 h-14 rounded-full bg-terra text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="text-[13px] text-muted">
              {user?.role === 'waiter' && 'Официант'}
              {user?.role === 'manager' && 'Менеджер'}
              {user?.role === 'admin' && 'Администратор'}
              {user?.venueName && ` · ${user.venueName}`}
            </div>
          </div>
        </div>

        {user?.role === 'waiter' && tipsData && (
          <div className="bg-white rounded-[14px] p-5 shadow-card mb-6 text-center border border-forest">
            <div className="text-[13px] text-muted mb-1">
              Чаевые за сегодня
            </div>
            <div className="text-[28px] font-bold text-forest">
              {tipsData.amount.toLocaleString('ru-RU')} ₽
            </div>
          </div>
        )}

        <div className="text-[13px] font-semibold text-muted uppercase tracking-wide mb-2.5 mt-2">
          Личные данные
        </div>
        <div className="bg-white rounded-[14px] p-[18px] shadow-card mb-6">
          <Field label="Имя" value={firstName} onChange={setFirstName} />
          <Field label="Фамилия" value={lastName} onChange={setLastName} />
          <Field
            label="Телефон"
            value={user?.phone ?? ''}
            disabled
            hint="Телефон нельзя изменить. Обратитесь к менеджеру."
            type="tel"
          />
        </div>

        <div className="text-[13px] font-semibold text-muted uppercase tracking-wide mb-2.5">
          Смена пароля
        </div>
        <div className="bg-white rounded-[14px] p-[18px] shadow-card mb-6">
          <Field
            label="Текущий пароль"
            value={currentPassword}
            onChange={setCurrentPassword}
            type="password"
            placeholder="Введите текущий пароль"
          />
          <Field
            label="Новый пароль"
            value={newPassword}
            onChange={setNewPassword}
            type="password"
            placeholder="Минимум 8 символов"
          />
          <Field
            label="Повторите пароль"
            value={repeatPassword}
            onChange={setRepeatPassword}
            type="password"
            placeholder="Повторите новый пароль"
          />
          <p className="text-xs text-muted mt-1.5">
            При создании аккаунта пароль генерируется автоматически.
            Рекомендуем сменить его при первом входе.
          </p>
        </div>

        <button
          onClick={() => {
            handleSave()
            handleChangePassword()
          }}
          className="w-full py-3.5 bg-terra text-white border-none rounded-xl text-base font-semibold cursor-pointer active:opacity-90"
        >
          Сохранить изменения
        </button>

        <hr className="border-none h-px bg-muted-bg my-5" />

        <button
          onClick={handleLogout}
          className="w-full py-3.5 bg-transparent text-danger border-2 border-danger rounded-xl text-base font-semibold cursor-pointer"
        >
          Выйти из аккаунта
        </button>
      </div>
    </>
  )
}

interface FieldProps {
  label: string
  value: string
  onChange?: (v: string) => void
  disabled?: boolean
  hint?: string
  placeholder?: string
  type?: 'text' | 'password' | 'tel'
}

const Field = ({
  label,
  value,
  onChange,
  disabled,
  hint,
  placeholder,
  type = 'text',
}: FieldProps) => (
  <div className="mb-4 last:mb-0">
    <label className="block text-[13px] font-semibold text-muted mb-1.5">
      {label}
    </label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      readOnly={!onChange}
      className="w-full py-3 px-3.5 border border-muted-bg rounded-[10px] text-[15px] text-ink bg-cream outline-none focus:border-terra disabled:text-muted disabled:bg-muted-light font-sans"
    />
    {hint && <p className="text-xs text-muted mt-1.5">{hint}</p>}
  </div>
)
