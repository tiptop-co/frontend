import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { AppShell } from '@/shared/ui/AppShell'
import { GuestLayout } from '@/shared/ui/GuestLayout'
import { WaiterLayout } from '@/shared/ui/WaiterLayout'
import { ManagerLayout } from '@/shared/ui/ManagerLayout'
import { ProtectedRoute } from '@/shared/ui/ProtectedRoute'
import { GuestMenuPage } from '@/pages/GuestMenuPage'
import { GuestDishPage } from '@/pages/GuestDishPage'
import { GuestCartPage } from '@/pages/GuestCartPage'
import { GuestOrderPage } from '@/pages/GuestOrderPage'
import { GuestPaymentPage } from '@/pages/GuestPaymentPage'
import { GuestCallWaiterPage } from '@/pages/GuestCallWaiterPage'
import { LoginPage } from '@/pages/LoginPage'
import { WaiterTablesPage } from '@/pages/WaiterTablesPage'
import { WaiterTableDetailPage } from '@/pages/WaiterTableDetailPage'
import { WaiterRequestsPage } from '@/pages/WaiterRequestsPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { ManagerMenuPage } from '@/pages/ManagerMenuPage'
import { ManagerDishFormPage } from '@/pages/ManagerDishFormPage'
import { ManagerVenuePage } from '@/pages/ManagerVenuePage'
import { ManagerWaitersPage } from '@/pages/ManagerWaitersPage'
import { ManagerTablesPage } from '@/pages/ManagerTablesPage'
import { ManagerStatsPage } from '@/pages/ManagerStatsPage'
import { AdminLayout } from '@/shared/ui/AdminLayout'
import { AdminManagersPage } from '@/pages/AdminManagersPage'
import { AdminStatsPage } from '@/pages/AdminStatsPage'
import { ManagerAddWaiterPage } from '@/pages/ManagerAddWaiterPage'
import { AdminAddManagerPage } from '@/pages/AdminAddManagerPage'

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
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

      { path: '/login', element: <LoginPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/waiter',
            element: <WaiterLayout />,
            children: [
              { index: true, element: <WaiterTablesPage /> },
              { path: 'table/:tableId', element: <WaiterTableDetailPage /> },
              { path: 'requests', element: <WaiterRequestsPage /> },
              { path: 'profile', element: <ProfilePage /> },
            ],
          },
          {
            path: '/manager',
            element: <ManagerLayout />,
            children: [
              { index: true, element: <ManagerMenuPage /> },
              { path: 'dish/:dishId', element: <ManagerDishFormPage /> },
              { path: 'venue', element: <ManagerVenuePage /> },
              { path: 'waiters', element: <ManagerWaitersPage /> },
              { path: 'waiters/new', element: <ManagerAddWaiterPage /> },
              { path: 'tables', element: <ManagerTablesPage /> },
              { path: 'stats', element: <ManagerStatsPage /> },
              { path: 'profile', element: <ProfilePage /> },
            ],
          },
          {
            path: '/admin',
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminManagersPage /> },
              { path: 'managers/new', element: <AdminAddManagerPage /> },
              { path: 'stats', element: <AdminStatsPage /> },
              { path: 'profile', element: <ProfilePage /> },
            ],
          },
        ],
      },

      { path: '*', element: <Navigate to="/table/5" replace /> },
    ],
  },
])

export const Router = () => <RouterProvider router={router} />
