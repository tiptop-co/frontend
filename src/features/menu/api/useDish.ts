import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import type { Dish } from '@/shared/types'

export const useDish = (dishId: string) =>
  useQuery({
    queryKey: ['dish', dishId],
    queryFn: () => apiClient<Dish>(`/dishes/${dishId}`),
  })
