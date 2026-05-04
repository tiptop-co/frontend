import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { normalizeUser, type ApiUser } from '@/shared/api/user'
import type { User, CreateUserDto, Venue } from '@/shared/types'

export const useAdminVenues = () =>
  useQuery({
    queryKey: ['admin', 'venues'],
    queryFn: () =>
      apiClient<{ data: Venue[] }>('/admin/venues').then((r) => r.data ?? []),
  })

export const useAdminManagers = () =>
  useQuery({
    queryKey: ['admin', 'managers'],
    queryFn: () =>
      apiClient<{ data: ApiUser[] }>('/admin/managers').then((r) =>
        (r.data ?? []).map(normalizeUser),
      ),
  })

export const useCreateManager = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (dto: CreateUserDto): Promise<User> => {
      const raw = await apiClient<ApiUser>('/admin/managers', {
        method: 'POST',
        body: JSON.stringify(dto),
      })
      return normalizeUser(raw)
    },
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
