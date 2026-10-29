# Raise the Node heap limit: type-aware ESLint (strictTypeChecked + projectService) over ~1900 files
# does not fit into the default ~2 GB V8 heap and runs out of memory, e.g. in local WSL runs.
export NODE_OPTIONS=--max-old-space-size=8192

export CORE_TYPES=./dist/web/core/index.d.ts
export VUE_TYPES=./dist/web/vue/index.d.ts
export NG_TYPES=./dist/web/angular/types/altegio-ui-workspace.d.ts
export WC_TYPES=./web/shared/constants/build/index.d.ts
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
	pnpm prepare-env # Copies .env.example to .env.local unless .env.local already exists
	pnpm vars-build

lint:
	pnpm exec eslint ./web/* -c ./configs/eslint.config.mjs
	pnpm exec stylelint ./web/**/*.css -c ./configs/.stylelintrc.json -i ./configs/.stylelintignore
	pnpm exec lit-analyzer 'web/core/**/*.{js,ts}' --strict

lib-build:
	# Start from a clean output directory
	rm -rf ./dist

	pnpm vars-build
	pnpm lib-build-core
	pnpm lib-build-vue
	pnpm build-with-workspace
	pnpm cli-build:bundle
	# Append the web component tag-name types to the core, Vue and Angular type declarations
	cat $$WC_TYPES >> $$CORE_TYPES
	cat $$WC_TYPES >> $$VUE_TYPES
	cat $$WC_TYPES >> $$NG_TYPES

	# Copy shared static assets (fonts, icons, tokens, SCSS breakpoints) into the package
	mkdir -p $$WEB_ASSETS_PATH/fonts $$WEB_ASSETS_PATH/css $$WEB_ASSETS_PATH/icons $$WEB_ASSETS_PATH/scss $$WEB_ASSETS_PATH/tokens
	cat $$BREAKPOINTS_SCSS >> $$WEB_ASSETS_PATH/scss/breakpoints.scss
	cp -r $$FONTS_PATH/* $$WEB_ASSETS_PATH/fonts
	cp -r $$ICONS_PATH/* $$WEB_ASSETS_PATH/icons
	cp -r $$TOKENS_PATH/* $$WEB_ASSETS_PATH/tokens
	# Package assets expose JavaScript and declarations to NodeNext consumers.
	pnpm exec tsc --ignoreConfig --module nodenext --moduleResolution nodenext --target es2022 --declaration --skipLibCheck --rootDir web/shared/constants/tokens --outDir $$WEB_ASSETS_PATH/tokens web/shared/constants/tokens/index.ts
	# Private package compatibility aliases are omitted from public snapshots.
	@if [ -f scripts/private-icon-compat.mjs ]; then node scripts/private-icon-compat.mjs; fi
	pnpm build-icons-dist
	cp -r $$CORE_CSS $$WEB_ASSETS_PATH/css
	echo $$FONTS_IMPORTS >> $$WEB_ASSETS_PATH/css/altegio-ui-with-fonts.css
	cat $$CORE_CSS >> $$WEB_ASSETS_PATH/css/altegio-ui-with-fonts.css
	rm -rf $$CORE_CSS $$FONTS_PATH

publish: init lint lib-build
	pnpm publish

storybook-build:
	# Start from a clean output directory
	rm -rf ./storybook-static

	pnpm story-build

storybook-public-build:
	# Start from a clean output directory
	rm -rf ./storybook-static-public

	pnpm story-build:public

test-unit:
	pnpm exec playwright install chromium
	pnpm test-unit-report

prepare-gitlab-registry-branch:
	git fetch
	git add .
	git reset --hard
	git checkout -b gitlab-registry origin/main
	git merge origin/main

pull:
	# Pull the latest changes from main
	git pull origin main --no-ff

	# Install dependencies and prepare the local environment
	pnpm install --frozen-lockfile
	pnpm exec lefthook install
	pnpm vars-build
	pnpm cli-build
