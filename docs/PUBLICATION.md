# Public package and release process

## Package identities and versions

`@altegio/ui` is the external npm identity. This change prepares its first publication; a local tarball and a public source snapshot do not establish that any version has been published. The root source version identifies the same API as the internal `@platform/altegio-ui` package. Maintainers must verify the candidate version is unused on npm and approve public release notes in PUBLIC_CHANGELOG.md before publication. Do not infer a public release history from internal 3.x versions or tags.

The source checkout remains the private release project. Public snapshots rename the development manifest to `@altegio/ui` but keep `private: true`. The separate tarball assembly allowlists consumer metadata and is publishable. It omits deprecated `ng/*` aliases, private compatibility code, internal delivery files, source maps, source TypeScript and development scripts/dependencies. It includes the supported Core/Vue/Angular component entries, types, CLI, assets and third-party license notices.

## Build, pack and install without publishing

Use Node 24.20.0 and pnpm 10.34.5:

```sh
pnpm install --frozen-lockfile
pnpm public:build
pnpm test-public-package
pnpm test-public-consumers
pnpm audit-dependencies
```

`public:build` always rebuilds canonical output from source, then writes `artifacts/public/package/`, `artifacts/public/altegio-ui-VERSION.tgz` and `artifacts/public/package-info.json` with integrity and SHA-256. It never runs npm publish. Running `node scripts/public-package.mjs` against an aliased private build fails. Repeating the build with the same toolchain, lockfile and source produces the same tarball.

In a new consumer outside this repository:

```sh
npm install /absolute/path/to/artifacts/public/altegio-ui-VERSION.tgz
```

Install the optional `vue` 3 peer or Angular 22 peers only for that integration. See the README for setup. The consumer gate installs the actual tarball into an isolated directory, typechecks its public imports, compiles Core/Vue and Angular AOT consumers, links Angular partial declarations, measures gzip bundle sizes and verifies registration/rendering in Playwright. It never aliases imports to repository source or shares node_modules.

## First-publication gates

Publication is intentionally unavailable until maintainers complete all of these external steps:

1. Confirm control of the `@altegio` npm scope, permission to create `@altegio/ui`, the unused candidate version, and font/asset distribution approval. Review PUBLIC_CHANGELOG.md and this migration documentation.
2. Review and integrate the package changes together with the component and visual tracks. Pass both source and public-snapshot CI, including the package, consumer, audit, browser, accessibility and visual gates.
3. Configure the public GitHub repository's `npm-public` environment to require maintainer approval and allow only protected `main`. Add its masked environment secret `NPM_PUBLIC_TOKEN`, a granular token scoped to this package with the necessary publication permission. The first package creation may require a scope-authorized bootstrap token. Do not place a token in source or a tarball. Configure a supported npm trusted publisher after the initial package exists if desired; that is a separate registry change.
4. Set the repository variable `ALTEGIO_UI_PUBLIC_PUBLISH_ENABLED=true` only after those controls exist. The manual workflow checks the repository, `main`, candidate version and the exact confirmation phrase, rebuilds and tests the tarball, then requests `npm-public` environment approval before publishing with provenance. Enabling the variable, creating secrets, accepting approval and dispatching publication are separate maintainer actions, not part of local code verification.
5. Verify the npm version, tarball integrity/provenance and a fresh registry installation. Record the publication and migration notes. Never overwrite a published version or run the private semantic-release configuration for the external package.

The private release continues through its existing GitLab semantic-release flow and legacy aliases. Private GitLab delivery retains its existing authenticated registry configuration. Moving that credential to native CI secrets or authenticated npm userconfig is a separately approved migration; this package change does not add a dependency on an absent environment variable. Public snapshots sanitize `.npmrc` and omit private GitLab delivery files; tarballs never include either. This patch does not create, rotate or change server-side credentials. Public snapshots remove the private release configuration entirely.

## Import migration

Replace `@platform/altegio-ui` with `@altegio/ui` for external consumers. Use `core/button`, `vue/button` or `angular/button` for one component; multiword component subpaths use kebab-case (`text-field`, `global-provider`). `core`, `vue` and `angular` keep the complete supported catalogs. The old `ng/button` paths remain private-only aliases of the full Angular catalog; switch to `angular/button` for a component or `angular` for the full catalog.

The external package exposes Alt-prefixed names only. Private legacy names and selectors require migration before changing package identities. Public snapshots are imported from internal main and replace the public tree. A community pull request must be accepted and applied in the source repository, then exported in the next snapshot; it is never merged directly into the snapshot tree.
