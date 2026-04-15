import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import type { Order, CreateOrderDto } from '@/shared/types'

export const useOrder = (tableId: string) =>
  useQuery({
    queryKey: ['order', tableId],
    queryFn: () => apiClient<Order>(`/tables/${tableId}/order`),
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
