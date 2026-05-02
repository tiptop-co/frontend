import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient, ApiError } from '@/shared/api/client'
import type { Order, CreateOrderDto } from '@/shared/types'

export const useOrder = (tableId: string) =>
  useQuery({
    queryKey: ['order', tableId],
    queryFn: async (): Promise<Order | null> => {
      try {
        return await apiClient<Order>(`/tables/${tableId}/order`)
      } catch (e) {
        if (e instanceof ApiError && e.status === 404) return null
        throw e
      }
    },
    retry: false,
  })

export const useCreateOrder = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateOrderDto) =>
      apiClient<Order>('/orders', {
        method: 'POST',
        body: JSON.stringify(dto),
      }),
    onSuccess: (order) => {
      qc.invalidateQueries({ queryKey: ['order', order.tableId] })
    },
  })
}
