# Интеграция с бекендом: карта API по страницам

Источники истины:
- Proto-контракт DTO — `api/tiptop.proto`
- Моковые хендлеры (живая спецификация) — `src/mocks/handlers/*.ts`
- React Query хуки — `src/features/*/api/*.ts`

База пути конфигурируется через `VITE_API_URL` (см. `.env.example`). Пути в таблицах ниже — относительно этой базы.

> **Правило:** при добавлении/изменении эндпоинта синхронно обновлять: `api/tiptop.proto`, `src/mocks/handlers/`, `src/shared/types/` и этот документ.

## Guest (посетитель)

| Страница | Метод | Путь | Назначение |
|---|---|---|---|
| `GuestMenuPage` | `GET` | `/tables/:tableId/menu` | меню заведения для стола |
| `GuestDishPage` | `GET` | `/dishes/:id` | детали блюда |
| `GuestCartPage` | — | — | только локальный стейт (Zustand) |
| `GuestOrderPage` | `GET` | `/tables/:tableId/order` | текущий заказ стола |
| `GuestPaymentPage` | `GET` | `/tables/:tableId/order` | заказ для расчёта |
| `GuestPaymentPage` | `POST` | `/transactions` | оплата с чаевыми |
| `GuestCallWaiterPage` | `GET` | `/tables/:tableId/call-status` | можно ли вызвать официанта |
| `GuestCallWaiterPage` | `GET` | `/tables/:tableId/requests` | список вызовов по столу |
| `GuestCallWaiterPage` | `POST` | `/requests` | вызов официанта |

## Waiter (официант)

| Страница | Метод | Путь | Назначение |
|---|---|---|---|
| `WaiterTablesPage` | `GET` | `/waiter/tables` | список столов официанта |
| `WaiterTableDetailPage` | `GET` | `/waiter/tables/:tableId` | детали стола |
| `WaiterTableDetailPage` | `POST` | `/waiter/tables/:tableId/close` | закрыть стол |
| `WaiterRequestsPage` | `GET` | `/waiter/requests` | список активных вызовов |
| `WaiterRequestsPage` | `POST` | `/waiter/requests/:id/accept` | принять вызов |

## Manager (управляющий)

| Страница | Метод | Путь | Назначение |
|---|---|---|---|
| `ManagerMenuPage` | `GET` | `/manager/menu` | меню заведения (редактирование) |
| `ManagerMenuPage` | `DELETE` | `/manager/dishes/:id` | удалить блюдо |
| `ManagerDishFormPage` | `GET` | `/manager/menu` | список категорий для селекта |
| `ManagerDishFormPage` | `GET` | `/dishes/:id` | данные блюда для редактирования |
| `ManagerDishFormPage` | `POST` | `/manager/dishes` | создать/обновить блюдо |
| `ManagerWaitersPage` | `GET` | `/manager/waiters` | список официантов |
| `ManagerWaitersPage` | `DELETE` | `/manager/waiters/:id` | удалить официанта |
| `ManagerAddWaiterPage` | `POST` | `/manager/waiters` | создать официанта |
| `ManagerTablesPage` | `GET` | `/manager/tables` | список столов |
| `ManagerTablesPage` | `POST` | `/manager/tables` | добавить стол |
| `ManagerTablesPage` | `DELETE` | `/manager/tables/:id` | удалить стол |
| `ManagerVenuePage` | `GET` | `/manager/venue` | данные заведения |
| `ManagerVenuePage` | `PUT` | `/manager/venue` | обновить заведение |
| `ManagerStatsPage` | `GET` | `/manager/stats` | статистика заведения |

## Admin (администратор платформы)

| Страница | Метод | Путь | Назначение |
|---|---|---|---|
| `AdminManagersPage` | `GET` | `/admin/managers` | список управляющих |
| `AdminManagersPage` | `DELETE` | `/admin/managers/:id` | удалить управляющего |
| `AdminAddManagerPage` | `POST` | `/admin/managers` | создать управляющего |
| `AdminStatsPage` | `GET` | `/admin/stats` | сводная статистика |

## Общее (кросс-роль)

| Страница | Метод | Путь | Назначение |
|---|---|---|---|
| `LoginPage` | `POST` | `/auth/login` | логин по телефону + паролю |
| `ProfilePage` | `GET` | `/waiter/tips/today` | чаевые за сегодня (для роли waiter) |
| `ProfilePage` | `PUT` | `/profile` | обновить имя/фамилию |
| `ProfilePage` | `POST` | `/profile/password` | сменить пароль |

## Запуск локально против бекенда

```bash
make run-backend API_URL=http://localhost:8080/api
# или с подробными логами:
make run-backend-debug API_URL=http://localhost:8080/api
```

См. также `docs/rules/build-and-run.md` и `docs/rules/api-integration.md`.
