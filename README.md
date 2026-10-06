# Altegio UI

## Environment
**Необходимое** окружение:

```
node 20.15.1
pnpm 9.10.0

Версии важны! С другими вресиями команды могут работать некорректено 
```

## Setup
Установка зависимостей и подготовка окружения:

```bash
# pnpm

make init # уже включает в себя Build vars и Build CLI
```

> **Note**: После выполнения `make init` проверьте и настройте значения переменных в файле `.env.local`.

Проверка кода:

```bash
make lint # подробнее можно ознакомиться в Linters
````

Сборка(без сторибука):

```bash
make lib-build # подробнее можно ознакомиться в Build lib
````

Публикация:

```bash
make publish # влючает в себя init, lint и lib-build 

pnpm publish # только публикация 
````

## Build vars
Сборка css переменных из токенов, сборка констант, сборка типов WC:

```bash
# pnpm

pnpm vars-build
```

## Build CLI
Сборка [CLI](./web/cli/README.md), которая позволяет создавать компоненты в Core\Vue\Angular, что-бы облегчить их разработку:

```bash
# pnpm

pnpm cli-build
```

> **Note**: [Документация CLI](./web/cli/README.md)

## Build lib
Сборка библиотеки:

```bash
# pnpm

# Сборка всех компонентов библиотеки
make lib-build

# Отдельно сборка ядра (WebComponents)
pnpm lib-build-core
# Отдельно сборка vue
pnpm lib-build-vue
# Отдельно сборка angular
pnpm lib-build-ng
# Сборка всех компонентов библиотеки
make lib-build
# Выполнение всех необходимых команд pull команд
make pull
```

## Build icons
Сборка иконок:

```bash
# pnpm

pnpm icons-build
```

## Linters
Проверки кода:

```bash
# pnpm

# Все главные проверки разом
make lint

# Для проверки WC
pnpm wc-analyze
# Для проверки commit message
pnpm lint-commit
# Для проверки ts, vue
pnpm lint-es
# Для проверки ts, vue с автофиксом
pnpm lint-es-fix
# Для проверки стилей
pnpm lint-style
# Для проверки стилей с автофиксом
pnpm lint-style-fix
```

## Storybook(ВОЗМОЖНО НЕ РАБОТАЕТ)
Интерактивная документация для компонентов:

```bash
# pnpm

# Разработка историй, запускает сразу core/vue/angular
pnpm story-dev
# Разработка историй ядра (WC)
pnpm story-dev-core
# Разработка историй vue
pnpm story-dev-vue
# Разработка историй angular
pnpm story-dev-ng

# Сборка историй ядра (WC)
pnpm story-build-core
# Сборка историй vue
pnpm story-build-vue
# Сборка историй angular
pnpm story-build-ng
# Сборка всех историй
make storybook-build
```
