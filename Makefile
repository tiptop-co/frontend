.PHONY: setup run check-node install-node install-deps

NODE_VERSION := 22

setup: check-node install-deps

run:
	npm run dev

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
