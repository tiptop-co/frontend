import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '@/features/auth'
import { useAuthStore } from '@/features/auth'
import { PhoneInput } from '@/shared/ui/PhoneInput'

const ROLE_ROUTES: Record<string, string> = {
  waiter: '/waiter',
  manager: '/manager',
  admin: '/admin',
}

export const LoginPage = () => {
  const navigate = useNavigate()
  const { mutate: login, isPending, isError } = useLogin()
  const user = useAuthStore((s) => s.user)
  const [phoneDigits, setPhoneDigits] = useState('')
  const [password, setPassword] = useState('')

  if (user) {
    const route = ROLE_ROUTES[user.role] ?? '/'
    navigate(route, { replace: true })
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(
      { phone: phoneDigits, password },
      {
        onSuccess: (data) => {
          const route = ROLE_ROUTES[data.user.role] ?? '/'
          navigate(route, { replace: true })
        },
      },
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full px-6">
        <div className="text-center mb-12">
          <div className="text-5xl mb-2">🍴</div>
          <h1 className="text-4xl font-bold text-terra tracking-tight">
            TipTop
          </h1>
          <p className="text-[15px] text-muted mt-1.5">Вход в систему</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-medium mb-1.5">Телефон</label>
            <PhoneInput
              value={phoneDigits}
              onChange={setPhoneDigits}
              className="py-3.5 px-4 text-base border-[1.5px]"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium mb-1.5">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full py-3.5 px-4 text-base border-[1.5px] border-muted-bg rounded-xl bg-white text-ink outline-none focus:border-terra placeholder:text-[#B8B3AB] font-sans"
            />
          </div>

          {isError && (
            <p className="text-danger text-sm mb-3">
              Неверный телефон или пароль
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 text-[17px] font-semibold text-white bg-terra border-none rounded-xl cursor-pointer mt-2 active:opacity-85 disabled:opacity-50"
          >
            {isPending ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  )
}
