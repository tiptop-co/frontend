import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'

interface UpdateProfileDto {
  firstName: string
  lastName: string
}

interface ChangePasswordDto {
  currentPassword: string
  newPassword: string
}

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: (dto: UpdateProfileDto) =>
      apiClient('/profile', { method: 'PUT', body: JSON.stringify(dto) }),
  })

export const useChangePassword = () =>
  useMutation({
    mutationFn: (dto: ChangePasswordDto) =>
      apiClient('/profile/password', {
        method: 'POST',
        body: JSON.stringify(dto),
      }),
  })
