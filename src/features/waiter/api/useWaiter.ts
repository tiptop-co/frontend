import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import type { Table, Order, WaiterRequest } from '@/shared/types'

interface WaiterTablesResponse {
  tables: Table[]
}

interface TableDetailResponse {
  table: Table
  order: Order | null
  requests: WaiterRequest[]
}

export const useWaiterTables = () =>
  useQuery({
    queryKey: ['waiter', 'tables'],
    queryFn: () => apiClient<WaiterTablesResponse>('/waiter/tables'),
  })

export const useWaiterTableDetail = (tableId: string) =>
  useQuery({
    queryKey: ['waiter', 'tables', tableId],
    queryFn: () => apiClient<TableDetailResponse>(`/waiter/tables/${tableId}/detail`),
  })

export const useWaiterRequests = () =>
  useQuery({
    queryKey: ['waiter', 'requests'],
    queryFn: () =>
      apiClient<{ data: WaiterRequest[] }>('/waiter/requests').then(
        (r) => r.data ?? [],
      ),
  })

export const useAcceptRequest = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (requestId: string) =>
      apiClient<WaiterRequest>(`/waiter/requests/${requestId}/accept`, {
        method: 'POST',
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['waiter'] })
    },
  })
}

export const useCloseTable = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (tableId: string) =>
      apiClient<Table>(`/waiter/tables/${tableId}/checkout`, { method: 'POST' }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['waiter'] })
    },
  })
}

export const useTodayTips = () =>
  useQuery({
    queryKey: ['waiter', 'tips'],
    queryFn: () => apiClient<{ amount: number }>('/waiter/tips/today'),
  })

export interface CompletedOrderSummary {
  orderId: string
  tableId: string
  tableNumber: number
  totalAmount: number
  itemsCount: number
  completedAt: string
}

export const useWaiterCompletedOrders = () =>
  useQuery({
    queryKey: ['waiter', 'completed-orders'],
    queryFn: () =>
      apiClient<{ data: CompletedOrderSummary[] }>('/waiter/orders/completed').then(
        (r) => r.data ?? [],
      ),
  })
