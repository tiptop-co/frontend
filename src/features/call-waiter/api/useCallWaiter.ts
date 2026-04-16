import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import type { WaiterRequest, CreateWaiterRequestDto } from '@/shared/types'

export const useCallStatus = (tableId: string) =>
  useQuery({
    queryKey: ['call-status', tableId],
    queryFn: () =>
      apiClient<{ canCall: boolean }>(`/tables/${tableId}/call-status`),
  })

export const useTableRequests = (tableId: string) =>
  useQuery({
    queryKey: ['requests', tableId],
    queryFn: () =>
      apiClient<{ data: WaiterRequest[] }>(`/tables/${tableId}/requests`).then(
        (r) => r.data,
      ),
  })

export const useCallWaiter = (tableId: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateWaiterRequestDto) =>
      apiClient<WaiterRequest>('/requests', {
        method: 'POST',
        body: JSON.stringify(dto),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['requests', tableId] })
    },
  })
}
