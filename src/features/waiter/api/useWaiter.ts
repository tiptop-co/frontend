import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import type { Table, Order, WaiterRequest, ClosedTableSession } from '@/shared/types'

interface WaiterTablesResponse {
  active: Table[]
  history: ClosedTableSession[]
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
    queryFn: () => apiClient<TableDetailResponse>(`/waiter/tables/${tableId}`),
  })

export const useWaiterRequests = () =>
  useQuery({
    queryKey: ['waiter', 'requests'],
    queryFn: () =>
      apiClient<{ data: WaiterRequest[] }>('/waiter/requests').then(
        (r) => r.data,
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
      apiClient<Table>(`/waiter/tables/${tableId}/close`, { method: 'POST' }),
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
