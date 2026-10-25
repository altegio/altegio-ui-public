# Altegio UI

Altegio UI is Altegio’s design system for web applications. It provides Lit-based web components, Vue and Angular integrations, design tokens, icons, and shared styles. Storybook contains interactive component examples and API documentation.

The [public repository](https://github.com/altegio/altegio-ui-public) receives code snapshots from the source project’s `main` branch. See [CHANGELOG.md](./CHANGELOG.md) for change information.

## Quick start

Use Node.js **24.20.0** and pnpm **10.34.5** to build this repository. The published package supports Node.js `22.15.x`–`22.x` and `24.15.x`–`24.x`. Its Vue and Angular peers are optional; the Angular integration requires Angular 22. Git and Make are required for the commands below.

```bash
git clone https://github.com/altegio/altegio-ui-public.git
cd altegio-ui-public
make init
pnpm story-dev
```

`make init` enables Corepack, installs dependencies from the lockfile, installs Git hooks, creates `.env.local` from `.env.example` if needed, and generates design tokens and shared constants. Sentry is disabled by default; review `.env.local` when configuring your development environment.

`pnpm story-dev` starts the Storybook entry point at **http://localhost:6005** and its component catalogs:

| Catalog | URL | Standalone command |
| --- | --- | --- |
| Web components | http://localhost:6006 | `pnpm story-dev-core` |
| Vue | http://localhost:6007 | `pnpm story-dev-vue` |
| Angular | http://localhost:6008 | `pnpm story-dev-ng` |

## Migrating from 1.x

The modernized package keeps Maskito 3, so Vue consumers can continue using `maskitoNumberOptionsGenerator` with `precision`. Angular consumers must upgrade from Angular 18 to Angular 22 before moving to the new major version. Node 20 consumers must move to Node 22.15+ or 24.15+.

## Repository layout

| Directory | Contents |
| --- | --- |
| `web/core` | Lit web components |
| `web/vue` | Vue components and integrations |
| `web/angular` | Angular components and integrations |
| `web/shared` | Shared styles, constants, icons, and utilities |
| `web/cli` | Component scaffolding and update tools |
| `tokens` | Design token definitions |
| `configs` | Build, lint, test, and Storybook configuration |

## Build the library

```bash
make lib-build
```

This generates tokens, builds the web components and Vue integration, prepares and builds the Angular workspace, and assembles the library and static assets under `dist/`.

For individual build steps:

```bash
pnpm vars-build             # Tokens, CSS variables, breakpoints, and shared types
pnpm lib-build-core        # Web components
pnpm lib-build-vue         # Vue integration
pnpm build-with-workspace  # Prepare and build the Angular workspace
pnpm icons-build           # Generate icon modules from SVG files
```

Run `pnpm vars-build` before individual library builds when generated assets are absent or tokens have changed. `make lib-build` runs it automatically.

TypeScript token constants use the `ALT_` prefix. The token generator puts the canonical values in `web/shared/constants/tokens/canonical.ts` and the deprecated `YC_` aliases in `web/shared/constants/tokens/legacy.ts`. The existing `./tokens` entry point re-exports both, so consumers can migrate imports gradually. Removing the aliases requires a separate major release.

The built `./tokens` entry point ships JavaScript and TypeScript declarations for NodeNext consumers. Private package builds add deprecated icon export aliases for existing products; public code snapshots omit those aliases.

## Run checks

```bash
make lint                       # ESLint, Stylelint, and strict Lit analysis
pnpm exec playwright install chromium
pnpm test-unit                  # Unit tests for all three integrations
```

The unit tests use Chromium through Playwright. On Linux, install Playwright’s system dependencies with `pnpm exec playwright install-deps chromium` if the browser cannot start.

| Check | Command |
| --- | --- |
| Web component tests | `pnpm test-unit-core` |
| Vue tests | `pnpm test-unit-vue` |
| Angular tests | `pnpm test-unit-ng` |
| Coverage report | `pnpm test-unit-report` |
| TypeScript and Vue lint | `pnpm lint-es` |
| Stylesheet lint | `pnpm lint-style` |
| Web component analysis | `pnpm wc-analyze` |
| Latest commit message | `pnpm lint-commit` |

Use `pnpm lint-es-fix` or `pnpm lint-style-fix` to apply automatic fixes.

## Build Storybook

```bash
make storybook-build
```

The static site is generated in `storybook-static/`, with the component catalogs in `core/`, `vue/`, and `angular/`. To build a public site with internal design links removed:

```bash
STORYBOOK_OUTPUT_DIR=./storybook-static-public make storybook-public-build
```

Set `STORYBOOK_BASE_URL` when hosting under a URL prefix. Individual builds are available as `pnpm story-build-web`, `pnpm story-build-core`, `pnpm story-build-vue`, and `pnpm story-build-ng`; set `STORYBOOK_OUTPUT_DIR` when invoking these scripts directly.

## Develop components

Build the [component CLI](./web/cli/README.md) to scaffold or update components:

```bash
pnpm cli-build
yds create
```

The CLI build also links the `yds` command globally. Run it from the repository root so it can find the component directories. Use Storybook to review component behavior and run the relevant unit tests before submitting changes.

Additional guides:

- [GlobalProvider context and queue modules](./web/core/src/ui/globalProvider/README.md)
- [Vue table mapping utilities](./web/vue/src/ui/simpleTable/examples.md)
