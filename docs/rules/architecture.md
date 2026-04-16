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
│   ├── GuestMenuPage.tsx
│   ├── LoginPage.tsx
│   ├── WaiterTablesPage.tsx
│   ├── ManagerMenuPage.tsx
│   ├── AdminManagersPage.tsx
│   └── ...
│
├── features/               # Бизнес-фичи (независимые единицы)
│   ├── auth/
│   │   ├── api/            # TanStack Query хуки фичи
│   │   ├── model/          # Zustand store фичи
│   │   └── index.ts        # Публичное API фичи
│   ├── menu/
│   │   ├── api/
│   │   ├── ui/             # Компоненты фичи (CategoryFilter, MenuCard)
│   │   └── index.ts
│   ├── cart/
│   ├── order/
│   ├── payment/
│   ├── call-waiter/
│   ├── waiter/
│   ├── manager/
│   ├── admin/
│   └── profile/
│
├── shared/                 # Всё переиспользуемое без бизнес-логики
│   ├── ui/                 # Button, Input, Card, Badge, TabBar, PhoneInput, ConfirmDialog, layouts...
│   ├── api/                # Базовый fetch-клиент
│   │   └── client.ts
│   └── types/              # Общие TypeScript типы
│       ├── user.ts
│       ├── dish.ts
│       ├── order.ts
│       └── ...
│
└── mocks/                  # ВСЕ моки строго здесь
    ├── browser.ts          # MSW worker (для dev)
    ├── handlers/           # Один файл = один ресурс API
    │   ├── auth.ts
    │   ├── menu.ts
    │   ├── orders.ts
    │   └── ...
    └── fixtures/           # Статичные тестовые данные
        ├── users.ts
        ├── dishes.ts
        └── ...
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
// src/mocks/handlers/menu.ts
import { http, HttpResponse } from 'msw'
import { dishes, categories } from '../fixtures/dishes'

export const menuHandlers = [
  http.get('/api/tables/:tableId/menu', () => {
    return HttpResponse.json({ dishes, categories })
  }),

  http.get('/api/dishes/:id', ({ params }) => {
    const dish = dishes.find(d => d.id === params.id)
    if (!dish) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(dish)
  }),
]
```

```typescript
// src/mocks/browser.ts — единая точка сборки всех хендлеров
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

### Фикстуры

```typescript
// src/mocks/fixtures/users.ts
import type { User } from '@/shared/types'

export const users: User[] = [
  { id: '1', firstName: 'Анна', lastName: 'Смирнова', phone: '79123456789', role: 'waiter' },
]
```

> Фикстуры — единственный источник тестовых данных. Не дублируй их в компонентах.
