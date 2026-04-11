# Архитектура проекта

Используется **облегчённый Feature-Sliced Design**. Полная FSD избыточна; этот вариант даёт изоляцию фич без лишних слоёв.

```
src/
├── app/                    # Точка входа, провайдеры, роутер
│   ├── App.tsx
│   ├── Router.tsx
│   └── providers/          # QueryClientProvider, etc.
│
├── pages/                  # Страницы = маршруты роутера
│   ├── HomePage.tsx
│   └── UserPage.tsx
│
├── features/               # Бизнес-фичи (независимые единицы)
│   └── auth/
│       ├── ui/             # Компоненты фичи
│       ├── model/          # Zustand store фичи
│       └── api/            # TanStack Query хуки фичи
│
├── shared/                 # Всё переиспользуемое без бизнес-логики
│   ├── ui/                 # Button, Input, Modal, Card...
│   ├── api/                # Базовый fetch-клиент
│   │   └── client.ts
│   └── types/              # Общие TypeScript типы
│
└── mocks/                  # ВСЕ моки строго здесь
    ├── browser.ts          # MSW worker (для dev)
    ├── handlers/           # Один файл = один ресурс API
    │   ├── users.ts
    │   └── orders.ts
    └── fixtures/           # Статичные тестовые данные
        ├── users.ts
        └── orders.ts
```

### Правила изоляции

- `pages/` импортируют из `features/` и `shared/`, но **не друг из друга**
- `features/` импортируют из `shared/`, но **не друг из друга**
- `shared/` не импортирует ничего из `features/` и `pages/`
- Любое нарушение этих правил — создай новую сущность в `shared/`

---

## 3. Мок-слой (MSW)

### Принцип

MSW перехватывает HTTP-запросы на уровне Service Worker. Компоненты делают **реальные fetch-запросы** — они не знают, кто отвечает: мок или сервер. Переход на бекенд = удалить одну строку инициализации.

### Инициализация

```typescript
// src/main.tsx
async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    return worker.start({ onUnhandledRequest: 'warn' })
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
})
```

**Переход на реальный бекенд:** убери `enableMocking()` или выставь `VITE_USE_MOCKS=false`.

### Структура хендлера

```typescript
// src/mocks/handlers/users.ts
import { http, HttpResponse } from 'msw'
import { users } from '../fixtures/users'

export const userHandlers = [
  http.get('/api/users', () => {
    return HttpResponse.json({ data: users })
  }),

  http.get('/api/users/:id', ({ params }) => {
    const user = users.find(u => u.id === params.id)
    if (!user) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(user)
  }),

  http.post('/api/users', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({ id: crypto.randomUUID(), ...body }, { status: 201 })
  }),
]
```

```typescript
// src/mocks/browser.ts — единая точка сборки всех хендлеров
import { setupWorker } from 'msw/browser'
import { userHandlers } from './handlers/users'
import { orderHandlers } from './handlers/orders'

export const worker = setupWorker(
  ...userHandlers,
  ...orderHandlers,
)
```

### Фикстуры

```typescript
// src/mocks/fixtures/users.ts
import type { User } from '@/shared/types'

export const users: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { id: '2', name: 'Bob',   email: 'bob@example.com',  role: 'user'  },
]
```

> Фикстуры — единственный источник тестовых данных. Не дублируй их в компонентах.
