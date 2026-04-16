# Quickstart

```bash
make setup   # установка зависимостей + инициализация MSW
make run     # запуск dev-сервера (http://localhost:5173)
```

Или вручную:

```bash
npm ci
npx msw init public/ --save --no-interactive
npm run dev
```

Другие команды:

```bash
npm run build     # продакшн-сборка (tsc + vite build)
npm run lint      # ESLint
npm run preview   # превью продакшн-сборки
npx tsc --noEmit  # проверка типов без сборки
```
