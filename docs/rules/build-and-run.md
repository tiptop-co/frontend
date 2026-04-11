# Quickstart (полный список команд)

```bash
# Установка
npm create vite@latest . -- --template react-ts
npm install

# Зависимости
npm install react-router-dom @tanstack/react-query zustand msw
npm install -D tailwindcss postcss autoprefixer eslint prettier
npx tailwindcss init -p
npx msw init public/ --save

# Разработка
npm run dev

# Проверка типов
npx tsc --noEmit
```