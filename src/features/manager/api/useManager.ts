import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { normalizeUser, type ApiUser } from '@/shared/api/user'
import type { Dish, MenuResponse, CreateDishDto, Venue, UpdateVenueDto, User, CreateUserDto, Table } from '@/shared/types'

export const useManagerMenu = () =>
  useQuery({
    queryKey: ['manager', 'menu'],
    queryFn: () => apiClient<MenuResponse>('/manager/menu'),
  })

export const useCreateDish = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateDishDto) =>
      apiClient<Dish>('/manager/dishes', { method: 'POST', body: JSON.stringify(dto) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['manager', 'menu'] }),
  })
}

export const useDeleteDish = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) =>
      apiClient(`/manager/dishes/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['manager', 'menu'] }),
  })
}

export const useVenue = () =>
  useQuery({
    queryKey: ['manager', 'venue'],
    queryFn: () => apiClient<Venue>('/manager/venue'),
  })

export const useUpdateVenue = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: UpdateVenueDto) =>
      apiClient<Venue>('/manager/venue', { method: 'PUT', body: JSON.stringify(dto) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['manager', 'venue'] }),
  })
}

interface RawWaiterStats {
  user: ApiUser
  tablesServedToday: number
  tipsToday: number
}

export interface WaiterWithStats extends User {
  tablesServedToday: number
  tipsToday: number
}

export const useManagerWaiters = () =>
  useQuery({
    queryKey: ['manager', 'waiters'],
    queryFn: () =>
      apiClient<{ data: RawWaiterStats[] }>('/manager/waiters').then((r) =>
        (r.data ?? []).map(
          (w): WaiterWithStats => ({
            ...normalizeUser(w.user),
            tablesServedToday: w.tablesServedToday ?? 0,
            tipsToday: w.tipsToday ?? 0,
          }),
        ),
      ),
  })

export const useCreateWaiter = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (dto: CreateUserDto): Promise<User> => {
      const raw = await apiClient<ApiUser>('/manager/waiters', {
        method: 'POST',
        body: JSON.stringify(dto),
      })
      return normalizeUser(raw)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['manager', 'waiters'] }),
  })
}

export const useDeleteWaiter = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) =>
      apiClient(`/manager/waiters/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['manager', 'waiters'] }),
  })
}

export const useManagerTables = () =>
  useQuery({
    queryKey: ['manager', 'tables'],
    queryFn: () => apiClient<{ tables: Table[] }>('/manager/tables').then((r) => r.tables ?? []),
  })

export const useCreateTable = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (number: number) =>
      apiClient<Table>('/manager/tables', {
        method: 'POST',
        body: JSON.stringify({ number }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['manager', 'tables'] }),
  })
}

export const useDeleteTable = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) =>
      apiClient(`/manager/tables/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['manager', 'tables'] }),
  })
}

interface ManagerStats {
  revenue: number
  ordersCount: number
  averageCheck: number
  tipsTotal: number
  dailyRevenue: { day: string; amount: number }[]
  topDishes: { name: string; count: number }[]
}

export const useManagerStats = () =>
  useQuery({
    queryKey: ['manager', 'stats'],
    queryFn: () => apiClient<ManagerStats>('/manager/stats'),
  })
