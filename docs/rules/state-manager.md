# State manager

## Серверный стейт (TanStack Query)

Все обращения к API — через кастомные хуки в `features/*/api/` или `shared/api/`.

```typescript
// src/features/users/api/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { User, CreateUserDto } from '@/shared/types'

const fetchUsers = (): Promise<User[]> =>
  fetch('/api/users').then(r => r.json()).then(r => r.data)

export const useUsers = () =>
  useQuery({ queryKey: ['users'], queryFn: fetchUsers })

export const useCreateUser = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateUserDto) =>
      fetch('/api/users', { method: 'POST', body: JSON.stringify(dto) }).then(r => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  })
}
```

- Компоненты **не вызывают fetch напрямую** — только хуки
- Query keys — строго типизированные строки-массивы, объявлены рядом с хуком
- Ошибки и loading обрабатываются в компоненте через `isLoading`, `isError`, `error`

## Клиентский стейт (Zustand)

Используй **только для UI-стейта**, не имеющего отношения к серверу: открыт ли sidebar, выбранные фильтры, тема, текущий пользователь после логина.

```typescript
// src/features/auth/model/authStore.ts
import { create } from 'zustand'
import type { User } from '@/shared/types'

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  setUser: user => set({ user }),
}))
```

- Один стор = одна фича или один домен
- Не храни в Zustand данные, которые уже кэшированы TanStack Query
- Никаких глобальных сторов-монстров
