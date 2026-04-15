# Routing

```typescript
// src/app/Router.tsx (упрощённая структура)
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      // Гость (без авторизации)
      {
        path: '/table/:tableId',
        element: <GuestLayout />,
        children: [
          { index: true, element: <GuestMenuPage /> },
          { path: 'dish/:dishId', element: <GuestDishPage /> },
          { path: 'cart', element: <GuestCartPage /> },
          { path: 'order', element: <GuestOrderPage /> },
          { path: 'payment', element: <GuestPaymentPage /> },
          { path: 'call', element: <GuestCallWaiterPage /> },
        ],
      },

      // Авторизация
      { path: '/login', element: <LoginPage /> },

      // Защищённые маршруты
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/waiter', element: <WaiterLayout />, children: [...] },
          { path: '/manager', element: <ManagerLayout />, children: [...] },
          { path: '/admin', element: <AdminLayout />, children: [...] },
        ],
      },

      // Fallback
      { path: '*', element: <Navigate to="/table/5" replace /> },
    ],
  },
])

export const Router = () => <RouterProvider router={router} />
```

- Все маршруты описаны **в одном месте** — `src/app/Router.tsx`
- Lazy loading страниц через `React.lazy` + `Suspense` — по необходимости, не по умолчанию
- Параметры маршрутов — через `useParams()`, поисковые параметры — `useSearchParams()`
- Для каждой роли — свой Layout с TabBar (`GuestLayout`, `WaiterLayout`, `ManagerLayout`, `AdminLayout`)
- Защита маршрутов — через `ProtectedRoute` (проверяет `useAuthStore`)
