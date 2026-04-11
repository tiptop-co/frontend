# Components

## Компонентный код-стайл

```typescript
// shared/ui/Button.tsx — эталонный компонент

interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
  onClick?: () => void
}

export const Button = ({ label, variant = 'primary', isLoading, onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className={`px-4 py-2 rounded font-medium ${
      variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
    }`}
  >
    {isLoading ? 'Loading...' : label}
  </button>
)
```

**Правила:**

- Только **функциональные компоненты**; классовые компоненты — запрещены
- Props-интерфейс объявляется прямо над компонентом, называется `ComponentNameProps`
- Один файл — один компонент (исключение: мелкие sub-компоненты внутри того же файла)
- `export default` — запрещён; только именованные экспорты
- `any` — запрещён; используй `unknown` с narrowing при необходимости
- `console.log` в продакшн-коде — запрещён
- Инлайн-обработчики сложнее одной строки выносить в именованные функции внутри компонента

## Структура файла фичи

```
features/users/
├── ui/
│   ├── UserList.tsx        # Компонент списка
│   └── UserCard.tsx        # Компонент карточки
├── api/
│   └── useUsers.ts         # TanStack Query хуки
├── model/
│   └── userStore.ts        # Zustand (если нужен UI-стейт)
└── index.ts                # Публичное API фичи (barrel export)
```

```typescript
// features/users/index.ts
export { UserList } from './ui/UserList'
export { useUsers } from './api/useUsers'
```

> Импортируй фичу только через `index.ts`, не напрямую из внутренних файлов.
