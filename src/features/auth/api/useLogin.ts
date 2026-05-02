import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { normalizeUser, type ApiUser } from '@/shared/api/user'
import type { AuthCredentials, AuthResponse } from '@/shared/types'
import { useAuthStore } from '../model/authStore'

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth)
  return useMutation({
    mutationFn: async (creds: AuthCredentials): Promise<AuthResponse> => {
      await apiClient<void>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          login: creds.phone,
          password: creds.password,
        }),
      })
      const raw = await apiClient<ApiUser>('/profile/me')
      return { user: normalizeUser(raw), token: '' }
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token)
    },
  })
}
