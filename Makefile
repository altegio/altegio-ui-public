# Поднимаем лимит heap Node: type-aware линтинг eslint (strictTypeChecked + projectService)
# по ~1900 файлам не помещается в дефолтные ~2 ГБ V8 и падает с OOM (актуально для локального запуска, напр. в WSL)
export NODE_OPTIONS=--max-old-space-size=8192

export CORE_TYPES=./dist/web/core/index.d.ts
export VUE_TYPES=./dist/web/vue/index.d.ts
export NG_TYPES=./dist/web/angular/index.d.ts
export WC_TYPES=./web/shared/constants/build/index.d.mts
export WEB_ASSETS_PATH=./dist/web/assets
export FONTS_PATH=./dist/fonts/
export BREAKPOINTS_SCSS=./web/shared/assets/scss/build/breakpoints.scss
export CORE_CSS=./dist/web/core/altegio-ui.css
export FONTS_IMPORTS=@import url('../fonts/inter/inter.css');
export ICONS_PATH=./web/shared/icons/
export TOKENS_PATH=./web/shared/constants/tokens/
export STORYBOOK_OUTPUT_DIR?=./storybook-static

init:
	corepack enable
	corepack prepare --activate
	pnpm install --frozen-lockfile
	pnpm exec lefthook install
	pnpm prepare-env # Копирует .env.example в .env.local, если .env.local не существует
	pnpm vars-build

lint:
	pnpm exec eslint ./web/* -c ./configs/eslint.config.mjs
	pnpm exec stylelint ./web/**/*.css -c ./configs/.stylelintrc.json -i ./configs/.stylelintignore
	pnpm exec lit-analyzer 'web/core/**/*.{js,ts}' --strict

lib-build:
	# Очистка папки перед сборкой
	rm -rf ./dist

	pnpm vars-build
	pnpm lib-build-core
	pnpm lib-build-vue
	pnpm build-with-workspace
	# Подмешивание типов констант тегов WC к сборкам фреймворков
	cat $$WC_TYPES >> $$CORE_TYPES
	cat $$WC_TYPES >> $$VUE_TYPES
	cat $$WC_TYPES >> $$NG_TYPES

	# Подмешивание статических ресурсов
	mkdir -p $$WEB_ASSETS_PATH/fonts $$WEB_ASSETS_PATH/css $$WEB_ASSETS_PATH/icons $$WEB_ASSETS_PATH/scss $$WEB_ASSETS_PATH/tokens
	cat $$BREAKPOINTS_SCSS >> $$WEB_ASSETS_PATH/scss/breakpoints.scss
	cp -r $$FONTS_PATH/* $$WEB_ASSETS_PATH/fonts
	cp -r $$ICONS_PATH/* $$WEB_ASSETS_PATH/icons
	cp -r $$TOKENS_PATH/* $$WEB_ASSETS_PATH/tokens
	cp -r $$CORE_CSS $$WEB_ASSETS_PATH/css
	echo $$FONTS_IMPORTS >> $$WEB_ASSETS_PATH/css/altegio-ui-with-fonts.css
	cat $$CORE_CSS >> $$WEB_ASSETS_PATH/css/altegio-ui-with-fonts.css
	rm -rf $$CORE_CSS $$FONTS_PATH
	ls -lhR $$WEB_ASSETS_PATH

publish: init lint lib-build
	pnpm publish

storybook-build:
	# Очистка папки перед сборкой
	rm -rf ./storybook-static

	pnpm story-build

storybook-public-build:
	# Очистка папки перед сборкой
	rm -rf ./storybook-static-public

	pnpm story-build:public

test-unit:
	# Установка браузера для playwright
	pnpm exec playwright install chromium
	
	# Установка зависимостей с полным восстановлением Ubuntu репозиториев
	pnpm exec playwright install-deps chromium || \
		(echo "Retry #1: Complete Ubuntu repositories restoration..." && \
		 mkdir -p /tmp/apt-fix && \
		 echo "deb http://archive.ubuntu.com/ubuntu/ noble main restricted universe multiverse" > /tmp/apt-fix/sources.list && \
		 echo "deb http://archive.ubuntu.com/ubuntu/ noble-updates main restricted universe multiverse" >> /tmp/apt-fix/sources.list && \
		 echo "deb http://security.ubuntu.com/ubuntu/ noble-security main restricted universe multiverse" >> /tmp/apt-fix/sources.list && \
		 echo "deb http://archive.ubuntu.com/ubuntu/ noble-backports main restricted universe multiverse" >> /tmp/apt-fix/sources.list && \
		 mv /etc/apt/sources.list.d/* /tmp/apt-fix/ 2>/dev/null || true && \
		 cp /tmp/apt-fix/sources.list /etc/apt/sources.list && \
		 rm -rf /var/lib/apt/lists/* && \
		 apt-get update && \
		 apt-get install -y libnspr4 libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libxkbcommon0 libatspi2.0-0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libcairo2 libpango-1.0-0 libasound2t64 libglib2.0-0 libx11-6 libxcb1 libxext6 && \
		 pnpm exec playwright install-deps chromium)

	# Запуск юнит-тестов
	pnpm test-unit-report

prepare-gitlab-registry-branch:
	git fetch
	git add .
	git reset --hard
	git checkout -b gitlab-registry origin/main
	git merge origin/main

pull:
	# Получение последних изменений из основной ветки
	git pull origin main --no-ff

	# Установка зависимостей и подготовка окружения
	pnpm install --frozen-lockfile
	pnpm exec lefthook install
	pnpm vars-build
	pnpm cli-build
