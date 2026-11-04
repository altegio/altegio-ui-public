# External consumer validation

Run `pnpm public:build`, `pnpm test-public-package` and `pnpm test-public-consumers`. The last command creates an isolated npm installation from the actual local tarball under `artifacts/consumers/`; it does not link the repository's source or node_modules. Core/Vue/Angular button applications use the complete catalog and a supported component entry point, load global CSS/fonts, and render in Chromium, Firefox and WebKit. `CONSUMER_BROWSERS=chromium,webkit` selects installed engines for local diagnosis; CI uses all three.

All supported component declarations are checked together under strict NodeNext resolution with `skipLibCheck: false` and `noUncheckedSideEffectImports: true`. Angular consumer applications are AOT-compiled using Angular 22's compiler; its partial library declarations pass through the official Angular Babel linker before esbuild. Vue uses the production Vue runtime. The harness also checks the CLI, font assets, side-effect-only Core registration and the absence of unrelated calendar/table/form modules in small consumer graphs.

## Bundle budgets

Measured on Node 24.20.0 with the committed lockfile, esbuild 0.28.2, Vue 3.5.44 and Angular 22.2.3. Figures are minified JavaScript compressed with gzip level 9; CSS/font assets are validated separately. The Angular measurements include the Angular runtime and bootstrap code. These are consumer builds, not source-file sizes.

| Consumer | Catalog JS gzip bytes | Component JS gzip bytes | Absolute budget | Maximum fraction of catalog |
| --- | ---: | ---: | ---: | ---: |
| Core button | 166745 | 33106 | 38000 | 0.25 |
| Vue button | 211046 | 58985 | 68000 | 0.35 |
| Angular button | 276756 | 133614 | 156000 | 0.60 |

`configs/consumer-budgets.json` allows roughly 15% absolute headroom and also requires a material improvement over the catalog. Both constraints fail the consumer gate. Update budgets only after measuring and reviewing the cause of a change; the test never rewrites them. Exact current results are saved in `artifacts/consumers/bundle-sizes.json`.

Core and shared runtime modules are compiled once in the Core build graph. Vue and Angular link those exact modules by relative packaged paths. Angular runtime wrappers are emitted from one partial compilation, then split into a single ESM graph shared by catalog and component entry points. No published framework entry contains a copied Core implementation. ng-packagr declaration artifacts stay outside dist; only declarations, metadata and the linked runtime are shipped. The public wrapper declarations reference the canonical Core classes as well, including private/protected member identities.

The installed-tarball gate additionally exercises eight composition cases: Angular button + text-field, button + icon, icon alone, catalog + granular button (bare imports and constructor equality), Core + Angular, Vue + Core + Angular, and an Angular provider/calendar/form application. The application asserts exact registry/class and plugin constructor identities, checks a Core-typed reference to the Angular provider, changes provider locale reactively and submits a named field through Angular Forms and the custom-element form. These checks detect duplicate Symbol contexts and class identities as well as registration exceptions. They run in every selected engine; CI selects Chromium, Firefox and WebKit.

Visual references use Chromium from the Playwright version in pnpm-lock.yaml inside `node:24.20.0@sha256:be23f54a88d34e8824c741b19b91064094f92c1c97b194144bfc8b50d67258e2` on Linux amd64. Pixel tests are isolated in the `visual` Vitest project, including `web/core/src/visual/tests` and the existing button screenshot. WebKit and Firefox behavior jobs do not compare Chromium pixel references.
