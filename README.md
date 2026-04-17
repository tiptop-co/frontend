# frontend

## Установка

```bash
make setup
```

Устанавливает Node.js (если нет), зависимости и инициализирует MSW.

## Запуск

Дев-сервер поднимается на `http://localhost:5173`.

### На моках

```bash
make run          # MSW-моки, без debug-логов
make run-mocks    # то же самое, явно
make run-debug    # моки + подробные логи API в консоли
```

### С бекендом

```bash
make run-backend API_URL=http://localhost:8080
make run-backend-debug API_URL=http://localhost:8080
```
Документация со списком используемых ручек бека для каждого экрана: `docs/arch/integration.md`.

## ENV-переменные

Значения парсятся из:  
- `.env.local`  
- флагов make  

| Переменная | Дефолт | Назначение |
|---|---|---|
| `VITE_API_URL` | `/api` | база для fetch-запросов |
| `VITE_USE_MOCKS` | `true` | включает MSW в dev-сборке |
| `VITE_DEBUG` | `false` | подробные логи API и error-хендлеры |
