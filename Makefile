.PHONY: setup run run-mocks run-debug run-backend run-backend-debug check-node install-node install-deps

NODE_VERSION := 22

# URL бекенда для run-backend* целей. Можно переопределить: make run-backend API_URL=http://...
API_URL ?= http://localhost:8080/api

setup: check-node install-deps

# Запуск с MSW-моками (дефолт).
run:
	npm run dev

# Явный запуск на моках.
run-mocks:
	VITE_USE_MOCKS=true npm run dev

# Моки + debug-режим (подробные логи в консоли).
run-debug:
	VITE_USE_MOCKS=true VITE_DEBUG=true npm run dev

# Запуск против реального бекенда. Моки выключены.
# Переопредели API_URL: make run-backend API_URL=http://192.168.1.10:8080/api
run-backend:
	@if [ -z "$(API_URL)" ]; then echo "API_URL не задан"; exit 1; fi
	VITE_USE_MOCKS=false VITE_API_URL=$(API_URL) npm run dev

# Реальный бекенд + debug.
run-backend-debug:
	@if [ -z "$(API_URL)" ]; then echo "API_URL не задан"; exit 1; fi
	VITE_USE_MOCKS=false VITE_API_URL=$(API_URL) VITE_DEBUG=true npm run dev

check-node:
	@command -v node >/dev/null 2>&1 || $(MAKE) install-node
	@echo "Node: $$(node -v) | npm: $$(npm -v)"

install-node:
	@echo "Node.js не найден. Устанавливаю..."
	@case "$$(uname -s 2>/dev/null || echo Windows)" in \
		Darwin) \
			command -v brew >/dev/null 2>&1 \
				|| /bin/bash -c "$$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"; \
			brew install node@$(NODE_VERSION); \
			;; \
		Linux) \
			if command -v curl >/dev/null 2>&1; then \
				curl -fsSL https://deb.nodesource.com/setup_$(NODE_VERSION).x | sudo -E bash -; \
			elif command -v wget >/dev/null 2>&1; then \
				wget -qO- https://deb.nodesource.com/setup_$(NODE_VERSION).x | sudo -E bash -; \
			else \
				echo "Установите curl или wget"; exit 1; \
			fi; \
			sudo apt-get install -y nodejs; \
			;; \
		*) \
			echo "Windows: выполните winget install OpenJS.NodeJS.LTS"; \
			echo "Затем перезапустите терминал и выполните make setup"; \
			exit 1; \
			;; \
	esac

install-deps:
	npm ci
	npx msw init public/ --save --no-interactive
