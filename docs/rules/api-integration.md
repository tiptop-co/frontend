# API-контракты для бекенда

Типы в `src/shared/types/` — это и есть контракт. Каждый тип соответствует сущности API.

```typescript
// src/shared/types/user.ts
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: string // ISO 8601
}

export interface CreateUserDto {
  name: string
  email: string
  role: 'admin' | 'user'
}

export interface UsersResponse {
  data: User[]
  total: number
  page: number
  pageSize: number
}
```

Хендлеры MSW документируют endpoint'ы: метод, путь, тело запроса, формат ответа, статус-коды. Бекенд читает `src/mocks/handlers/` как живую спецификацию.

> **Правило:** если в компоненте появился новый API-вызов — сначала опиши тип в `shared/types/`, потом хендлер в `mocks/handlers/`.

## Переход на реальный бекенд (чеклист)

- [ ] Убрать инициализацию MSW из `main.tsx`
- [ ] Выставить реальный `VITE_API_URL` в `.env.production`
- [ ] Проверить, что все типы в `shared/types/` совпадают с ответами бекенда
- [ ] Удалить `src/mocks/` (опционально, можно оставить для тестов)

Изменений в компонентах, хуках и сторах — **ноль**.
