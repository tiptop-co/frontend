import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import type { User, CreateUserDto } from '@/shared/types'

export const useAdminManagers = () =>
  useQuery({
    queryKey: ['admin', 'managers'],
    queryFn: () => apiClient<{ data: User[] }>('/admin/managers').then((r) => r.data),
  })

export const useCreateManager = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateUserDto) =>
      apiClient<User>('/admin/managers', { method: 'POST', body: JSON.stringify(dto) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'managers'] }),
  })
}

export const useDeleteManager = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) =>
      apiClient(`/admin/managers/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'managers'] }),
  })
}

interface VenueStats {
  name: string
  revenue: number
  orders: number
  averageCheck: number
}

interface AdminStats {
  venuesCount: number
  totalRevenue: number
  totalOrders: number
  averageCheck: number
  venues: VenueStats[]
}

export const useAdminStats = () =>
  useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => apiClient<AdminStats>('/admin/stats'),
  })
