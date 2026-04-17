# Quickstart

```bash
make setup   # установка зависимостей + инициализация MSW
make run     # запуск dev-сервера (http://localhost:5173), MSW-моки включены
```

## Режимы запуска

```bash
make run                 # моки (дефолт)
make run-mocks           # явно моки
make run-debug           # моки + debug-логи
make run-backend  API_URL=http://localhost:8080/api         # реальный бек, без моков
make run-backend-debug API_URL=http://localhost:8080/api    # реальный бек + debug
```

## ENV-переменные

Полный список и дефолты — в `.env.example`. Можно задать через `.env.local` или
передать инлайн (как делает Makefile):

| Переменная | Дефолт | Назначение |
|---|---|---|
| `VITE_API_URL` | `/api` | база для fetch-запросов |
| `VITE_USE_MOCKS` | `true` | включает MSW в dev-сборке |
| `VITE_DEBUG` | `false` | подробные логи API, тела ошибок, глобальные error-хендлеры |

Список ручек, которые дёргает каждая страница: `docs/arch/integration.md`.

## Другие команды

```bash
npm run build     # продакшн-сборка (tsc + vite build)
npm run lint      # ESLint
npm run preview   # превью продакшн-сборки
npx tsc --noEmit  # проверка типов без сборки
```
