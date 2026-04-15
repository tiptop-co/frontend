import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import type { AuthCredentials, AuthResponse } from '@/shared/types'
import { useAuthStore } from '../model/authStore'

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth)
  return useMutation({
    mutationFn: (creds: AuthCredentials) =>
      apiClient<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(creds),
      }),
    onSuccess: (data) => {
      setAuth(data.user, data.token)
    },
  })
}
