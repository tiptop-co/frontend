import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import type { Transaction, CreateTransactionDto } from '@/shared/types'

export const useCreateTransaction = (tableId: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateTransactionDto) =>
      apiClient<Transaction>('/transactions', {
        method: 'POST',
        body: JSON.stringify(dto),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['order', tableId] })
    },
  })
}
