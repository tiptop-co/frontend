# Components

## Компонентный код-стайл

```typescript
// shared/ui/Button.tsx — эталонный компонент

interface ButtonProps {
  label: string
  variant?: 'primary' | 'outline' | 'danger-outline' | 'ghost'
  isLoading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
}

export const Button = ({
  label,
  variant = 'primary',
  isLoading,
  disabled,
  fullWidth = true,
  onClick,
  type = 'button',
}: ButtonProps) => {
  const base = 'rounded-xl text-base font-semibold py-3.5 px-4 ...'
  const variants: Record<string, string> = {
    primary: 'bg-terra text-white',
    outline: 'bg-transparent text-terra border-2 border-terra',
    'danger-outline': 'bg-transparent text-danger border-2 border-danger',
    ghost: 'bg-transparent text-terra',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
    >
      {isLoading ? 'Загрузка...' : label}
    </button>
  )
}
```

**Правила:**

- Только **функциональные компоненты**; классовые компоненты — запрещены
- Props-интерфейс объявляется прямо над компонентом, называется `ComponentNameProps`
- Один файл — один компонент (исключение: мелкие sub-компоненты внутри того же файла)
- `export default` — запрещён; только именованные экспорты
- `any` — запрещён; используй `unknown` с narrowing при необходимости
- `console.log` в продакшн-коде — запрещён
- Инлайн-обработчики сложнее одной строки выносить в именованные функции внутри компонента

## Shared UI компоненты

Общие компоненты в `shared/ui/`:

| Компонент | Назначение |
|---|---|
| `Button` | Кнопка (primary / outline / danger-outline / ghost) |
| `Input` | Текстовое поле с лейблом и подсказкой |
| `TextArea` | Многострочный ввод |
| `Select` | Выпадающий список |
| `Card` | Белая карточка с тенью |
| `Badge` | Статусный бейдж (unpaid / paid / free / closed / active / pending) |
| `PageHeader` | Sticky-шапка с заголовком и кнопкой назад |
| `TabBar` | Фиксированная нижняя навигация |
| `PhoneInput` | Ввод телефона с маской `+7 XXX XXX-XX-XX`, хранит только цифры |
| `ConfirmDialog` | Модальный диалог подтверждения (замена `window.confirm`) |
| `AppShell` | Обёртка max-width 430px |
| `GuestLayout` / `WaiterLayout` / `ManagerLayout` / `AdminLayout` | Layout с TabBar для каждой роли |
| `ProtectedRoute` | Редирект на `/login` для неавторизованных |

## Структура файла фичи

```
features/menu/
├── ui/
│   ├── CategoryFilter.tsx
│   └── MenuCard.tsx
├── api/
│   ├── useMenu.ts
│   └── useDish.ts
└── index.ts                # Публичное API фичи (barrel export)
```

```typescript
// features/menu/index.ts
export { useMenu } from './api/useMenu'
export { useDish } from './api/useDish'
```

> Импортируй фичу только через `index.ts`, не напрямую из внутренних файлов.
