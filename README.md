# Altegio UI · Beta

[![Status: beta](https://img.shields.io/badge/status-beta-orange)](https://www.npmjs.com/package/@altegio/ui) [![npm beta](https://img.shields.io/npm/v/@altegio/ui/beta)](https://www.npmjs.com/package/@altegio/ui)

**Beta · under active development.** The public API may change before 1.0.

Altegio UI is Altegio’s design system for web applications. It provides Lit-based web components, Vue and Angular integrations, design tokens, icons, and shared styles. Storybook contains interactive component examples and API documentation.

Install the public package from npm. `latest` and `beta` both track the current 0.x beta release; use an exact version for reproducible application builds. See the [public changelog](./PUBLIC_CHANGELOG.md) for release notes.

## Install

```sh
npm install @altegio/ui
# Explicit beta channel:
npm install @altegio/ui@beta
```

Load shared CSS once in the application entry point. Use the font variant only when you want the included Inter fonts:

```ts
import '@altegio/ui/assets/css/altegio-ui-with-fonts.css'
// Or use assets/css/altegio-ui.css with your own font setup.
import '@altegio/ui/core/global-provider'
import '@altegio/ui/core/button'
```

```html
<alt-core-global-provider>
  <alt-core-button label="Save"></alt-core-button>
</alt-core-global-provider>
```

For Vue 3, install `vue` alongside `@altegio/ui` and import the wrappers in a Vue application:

```ts
import { createApp, h } from 'vue'
import { AltGlobalProvider } from '@altegio/ui/vue/global-provider'
import { AltButton } from '@altegio/ui/vue/button'
import '@altegio/ui/assets/css/altegio-ui-with-fonts.css'

createApp({ render: () => h(AltGlobalProvider, null, {
  default: () => h(AltButton, { label: 'Save' }),
}) }).mount('#app')
```

For Angular 22, use a standalone application with compatible `@angular/core`, `@angular/common`, `@angular/compiler` and `@angular/platform-browser` peers, `rxjs` and `tslib`. Standard Angular CLI application builds link the package's partial declarations:

```ts
import { Component } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import { AltGlobalProvider } from '@altegio/ui/angular/global-provider'
import { AltButton } from '@altegio/ui/angular/button'

@Component({
  selector: 'app-root',
  imports: [AltGlobalProvider, AltButton],
  template: '<AltGlobalProvider><AltButton label="Save" /></AltGlobalProvider>',
})
class App {}
bootstrapApplication(App)
```

Add `@altegio/ui/assets/css/altegio-ui-with-fonts.css` to the Angular application's global styles. The wrappers register their required custom elements; importing a separate Core catalog is unnecessary. These integrations render browser custom elements; server-side rendering is not currently a supported consumer path.

## Develop locally

Use Node.js **24.20.0** and pnpm **10.34.5** to build this repository. The package runtime supports Node.js `22.15.x`–`22.x` and `24.15.x`–`24.x`. Its Vue and Angular peers are optional; the Angular integration requires Angular 22. Git and Make are required for the commands below.

```bash
git clone https://github.com/altegio/altegio-ui-public.git
cd altegio-ui-public
make init
pnpm story-dev:public
```

`make init` enables Corepack, installs dependencies from the lockfile, installs Git hooks, and generates design tokens and shared constants.

`pnpm story-dev:public` starts the public Storybook entry point at **http://localhost:6005** and its component catalogs. The overview links to the component catalogs and public release notes:

| Catalog | URL | Standalone command |
| --- | --- | --- |
| Web components | http://localhost:6006 | `pnpm story-dev-core` |
| Vue | http://localhost:6007 | `pnpm story-dev-vue` |
| Angular | http://localhost:6008 | `pnpm story-dev-ng` |

## Package entry points

| Import | Contents |
| --- | --- |
| `@altegio/ui` or `@altegio/ui/core` | Lit web components |
| `@altegio/ui/vue` | Vue components |
| `@altegio/ui/angular` | Angular components |
| `@altegio/ui/icons` | Icon definitions |
| `@altegio/ui/tokens` | Design token constants |
| `@altegio/ui/assets/*` | Stylesheets, fonts, SCSS breakpoints, and raw icons and tokens, for example `assets/css/altegio-ui.css` |

Use `@altegio/ui/core/button`, `@altegio/ui/vue/button` and `@altegio/ui/angular/button` for a single component. Multiword subpaths use kebab-case, for example `text-field` and `global-provider`. Only components exported by the corresponding framework catalog are supported; wrappers that have not been released for a framework do not acquire a subpath.

See [PUBLICATION.md](./docs/PUBLICATION.md) for candidate builds and the release process.

Bundle measurements and test methodology are recorded in [CONSUMER_VALIDATION.md](./docs/CONSUMER_VALIDATION.md).

Core, Vue and Angular entries share the canonical Core runtime; component and catalog imports can be composed in one application. Importing a component module registers its custom elements, so the package marks the component bundles and stylesheets as side effects. Icons and tokens are side-effect free and tree-shake normally.

## Browser support and accessibility

The browser baseline is Safari 14.1, iOS 16, Chrome 109 and Firefox 115. CI exercises current Chromium, Firefox and WebKit, with separate accessibility and Linux visual regression checks. Exact historical Safari/iOS device coverage remains [unverified](./docs/HISTORICAL_BROWSER_VALIDATION.md).

Components include keyboard and focus behavior, accessible labels and form semantics. Applications still need to provide meaningful labels and validate accessibility in their own context.

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

The Angular package is built with ng-packagr from a copy of the sources in `workspace/` (ignored by Git). ng-packagr compiles only files under the library root and does not understand Vite's `?inline` CSS imports, so `scripts/clone-workspace.js` copies the Angular, core, shared, and token sources there and `scripts/fix-workspace-imports.js` rewrites the path aliases and inlines the processed CSS.

TypeScript token constants use the `ALT_` prefix. The token generator writes them to `web/shared/constants/tokens/canonical.ts`, and the `./tokens` entry point re-exports them.

The built `./tokens` entry point ships JavaScript and TypeScript declarations for NodeNext consumers.

## Run checks

```bash
make lint                       # ESLint, Stylelint, and strict Lit analysis
pnpm exec playwright install chromium firefox webkit
pnpm typecheck
pnpm test-unit                  # Unit tests for all three integrations
```

Unit tests use Chromium through Playwright by default. Set `TEST_BROWSER=firefox` or `TEST_BROWSER=webkit` to run the same behavior tests in another engine. Visual screenshot tests run only in the pinned Linux Chromium environment; see CI for the exact image. On Linux, install Playwright’s system dependencies with `pnpm exec playwright install-deps chromium` if the browser cannot start.

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

Build the [component CLI](https://github.com/altegio/altegio-ui-public/blob/main/web/cli/README.md) to scaffold or update components:

```bash
pnpm cli-build
alt-ds create
```

The CLI build also links the `alt-ds` command globally. Run it from the repository root so it can find the component directories. Use Storybook to review component behavior and run the relevant unit tests before submitting changes.

Additional guides:

- [GlobalProvider context and queue modules](https://github.com/altegio/altegio-ui-public/blob/main/web/core/src/ui/globalProvider/README.md)
- [Vue table mapping utilities](https://github.com/altegio/altegio-ui-public/blob/main/web/vue/src/ui/simpleTable/examples.md)

## Contributing

Bug reports, proposals, and pull requests are welcome in the public repository. Because it receives snapshots rather than merges, maintainers apply accepted changes in the source repository; [CONTRIBUTING.md](./CONTRIBUTING.md) describes the process. Report security issues privately as described in [SECURITY.md](./SECURITY.md). Everyone taking part is expected to follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

Altegio UI source is available under the [MIT License](./LICENSE). Bundled fonts and dependencies retain the licenses in [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md); the tarball includes the complete notices.
