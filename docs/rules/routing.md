# Routing

```typescript
// src/app/Router.tsx
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { UserPage } from '@/pages/UserPage'
import { Layout }   from '@/shared/ui/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Outlet /></Layout>,
    children: [
      { index: true,     element: <HomePage /> },
      { path: 'users/:id', element: <UserPage /> },
    ],
  },
])

export const Router = () => <RouterProvider router={router} />
```

- Все маршруты описаны **в одном месте** — `src/app/Router.tsx`
- Lazy loading страниц через `React.lazy` + `Suspense` — по необходимости, не по умолчанию
- Параметры маршрутов — через `useParams()`, поисковые параметры — `useSearchParams()`
