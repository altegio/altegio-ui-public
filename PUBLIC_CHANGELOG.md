# Altegio UI beta changelog

Altegio UI is beta and under active development. The public API may change before 1.0.

## 0.3.18 — Beta

- Start the independent public 0.x beta series with consistent package metadata, README and Storybook branding.
- Simplify installation and onboarding around the current Core, Vue 3 and Angular 22 APIs.
- Publish the current beta on both `beta` and `latest` so the default npm install selects it.
- Preserve component behavior, supported imports, types, accessibility checks, browser baseline and bundled license notices.

The earlier 3.18.1 package remains available. Existing version ranges and lockfiles are unchanged; adopting 0.x requires explicitly selecting it. See the [release process](./docs/PUBLICATION.md) and [npm registry](https://www.npmjs.com/package/@altegio/ui) for publication status.

## 3.18.1 — First public release · November 4, 2026

- Introduced the public package with web components, Vue and Angular integrations, component entry points, design tokens, icons and shared styles.
- Included canonical shared runtime modules, strict consumer type checks, browser rendering, accessibility and visual regression coverage.

Public source changes are recorded in the [snapshot history](https://github.com/altegio/altegio-ui-public/commits/main/). Source snapshots and npm releases have separate publication schedules.
