import { useEffect, useState } from 'react'
import { apiClient, ApiError } from '@/shared/api/client'
import { normalizeUser, type ApiUser } from '@/shared/api/user'
import { useAuthStore } from '../model/authStore'

export const useRestoreSession = () => {
  const setAuth = useAuthStore((s) => s.setAuth)
  const user = useAuthStore((s) => s.user)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (user) {
      setChecked(true)
      return
    }
    let cancelled = false
    apiClient<ApiUser>('/profile/me')
      .then((raw) => {
        if (cancelled) return
        setAuth(normalizeUser(raw), '')
      })
      .catch((e) => {
        if (!(e instanceof ApiError)) {
          console.warn('[restore session] network error', e)
        }
      })
      .finally(() => {
        if (!cancelled) setChecked(true)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return checked
}
