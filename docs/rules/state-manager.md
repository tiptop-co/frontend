# State manager

## Серверный стейт (TanStack Query)

Все обращения к API — через кастомные хуки в `features/*/api/`.

```typescript
// src/features/menu/api/useMenu.ts
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import type { MenuResponse } from '@/shared/types'

export const useMenu = (tableId: string) =>
  useQuery({
    queryKey: ['menu', tableId],
    queryFn: () => apiClient<MenuResponse>(`/tables/${tableId}/menu`),
  })
```

```typescript
// src/features/order/api/useOrder.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateOrder = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateOrderDto) =>
      apiClient<Order>('/orders', { method: 'POST', body: JSON.stringify(dto) }),
    onSuccess: (order) => qc.invalidateQueries({ queryKey: ['order', order.tableId] }),
  })
}
```

- Компоненты **не вызывают fetch напрямую** — только хуки
- Query keys — строго типизированные строки-массивы, объявлены рядом с хуком
- Ошибки и loading обрабатываются в компоненте через `isLoading`, `isError`, `error`

## Клиентский стейт (Zustand)

Используй **только для UI-стейта**, не имеющего отношения к серверу: корзина, текущий пользователь после логина, состояние диалогов.

```typescript
// src/features/auth/model/authStore.ts
import { create } from 'zustand'
import type { User } from '@/shared/types'

interface AuthState {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: null,
  setAuth: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}))
```

- Один стор = одна фича или один домен
- Не храни в Zustand данные, которые уже кэшированы TanStack Query
- Никаких глобальных сторов-монстров
- `ConfirmDialog` использует свой Zustand-стор для глобального состояния диалога
