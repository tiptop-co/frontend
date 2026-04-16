import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import type { MenuResponse } from '@/shared/types'

export const useMenu = (tableId: string) =>
  useQuery({
    queryKey: ['menu', tableId],
    queryFn: () => apiClient<MenuResponse>(`/tables/${tableId}/menu`),
  })
