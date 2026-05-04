import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'

export const useBootstrapTable = () =>
  useMutation({
    mutationFn: (qrToken: string) =>
      apiClient<void>('/tables/bootstrap', {
        method: 'POST',
        body: JSON.stringify({ qr_token: qrToken }),
      }),
  })
