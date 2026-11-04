# Public package changelog

## Unreleased external-package candidate

The source version is recorded in package.json. It is shared with the private package to identify the source API; it does not imply that earlier versions of `@altegio/ui` were published. This change prepares the first external package. Publication still requires the gates in [PUBLICATION.md](./docs/PUBLICATION.md).

- Provide a separate `@altegio/ui` tarball with canonical Alt-prefixed exports, types, assets and license notices.
- Provide supported per-component entry points for Core, Vue and Angular, with consumer and bundle-size checks.
- Share canonical Core classes, contexts and registration across mixed framework/catalog/component imports, with installed-tarball composition regressions.
- Preserve the separate private release and its deprecated compatibility aliases.
- Support native and legacy form paths with disabled state, external errors, reset behavior and Angular ControlValueAccessor integration.
- Include accessibility, token contrast and right-to-left layout fixes with browser and visual regression coverage.

Candidate notes are ready for maintainer review; no external version or publication date is asserted. The browser baseline remains Safari 14.1 and iOS 16, with historical-device verification still pending.

Public source updates are recorded in the [snapshot history](https://github.com/altegio/altegio-ui-public/commits/main/). A snapshot commit is not an npm release. Maintainers must add reviewed release notes here when approving an external version; internal release notes and issue links are not copied into the public package.
