# API-контракты для бекенда

Типы в `src/shared/types/` — это и есть контракт. Каждый тип соответствует сущности API.

```typescript
// src/shared/types/user.ts
export interface User {
  id: string
  firstName: string
  lastName: string
  phone: string           // Уникальный идентификатор, не email
  role: 'guest' | 'waiter' | 'manager' | 'admin'
  venueId?: string
  venueName?: string
  createdAt: string       // ISO 8601
}

export interface CreateUserDto {
  firstName: string
  lastName: string
  phone: string
  role: 'guest' | 'waiter' | 'manager' | 'admin'
  venueId?: string
}
```

Хендлеры MSW документируют endpoint'ы: метод, путь, тело запроса, формат ответа, статус-коды. Бекенд читает `src/mocks/handlers/` как живую спецификацию.

Полный API-контракт в формате protobuf: `api/tiptop.proto`. Из него генерируются DTO и SDK на Go.

## HTTP-методы

Используются стандартные RESTful методы: GET, POST, PUT, DELETE.

- `GET` — чтение данных
- `POST` — создание ресурсов и действия (например, принятие заявки, закрытие стола)
- `PUT` — обновление ресурса
- `DELETE` — удаление ресурса

> **Правило:** если в компоненте появился новый API-вызов — сначала опиши тип в `shared/types/`, потом хендлер в `mocks/handlers/`.

> **Правило:** при любом изменении контракта (новый эндпоинт, изменение request/response, переименование поля) — обязательно обновить `api/tiptop.proto`. Proto-схема должна быть синхронизирована с `shared/types/` и `mocks/handlers/` в каждом коммите.

## Формат телефона

- На фронте телефон хранится и отправляется как строка цифр: `79123456789`
- Отображается через компонент `PhoneInput` в формате `+7 912 345-67-89`
- Бекенд хранит и принимает телефон в едином формате (только цифры)

## Переход на реальный бекенд (чеклист)

- [ ] Убрать инициализацию MSW из `main.tsx`
- [ ] Выставить реальный `VITE_API_URL` в `.env.production`
- [ ] Проверить, что все типы в `shared/types/` совпадают с ответами бекенда
- [ ] Удалить `src/mocks/` (опционально, можно оставить для тестов)

Изменений в компонентах, хуках и сторах — **ноль**.
