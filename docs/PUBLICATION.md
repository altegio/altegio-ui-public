# Public package and release process

## Package identities and versions

`@altegio/ui` is the external npm identity. Version 3.18.1 is the approved first-publication candidate; a local tarball and a public source snapshot do not establish that it has been published. The root source version identifies the same API as the internal `@platform/altegio-ui` package. Maintainers must verify the candidate version is unused on npm and approve public release notes in PUBLIC_CHANGELOG.md before publication. Do not infer a public release history from internal 3.x versions or tags.

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
4. Set the repository variable `ALTEGIO_UI_PUBLIC_PUBLISH_ENABLED=true` only after those controls exist. The manual workflow checks the repository, protected `main`, candidate version and the exact confirmation phrase, rebuilds and tests the tarball, then requests `npm-public` environment approval before publishing with provenance. Enabling the variable, creating secrets, accepting approval and dispatching publication are separate maintainer actions, not part of local code verification.
5. Verify the npm version, tarball integrity/provenance and a fresh registry installation. Record the publication and migration notes. Never overwrite a published version or run the private semantic-release configuration for the external package.

The private release continues through GitLab semantic-release with legacy aliases. Its existing Nexus credential is stored as the masked, protected `ALTEGIO_UI_NPM_TOKEN` project variable. Only the release job writes it to a temporary npm userconfig, verifies authentication and deletes the file on exit. The checked-in `.npmrc` contains registry URLs only. MR validation and public snapshot jobs install without that credential. Public snapshots sanitize `.npmrc` and omit `.gitlab/`; tarballs omit all delivery configuration. See the private registry runbook in the source repository for ref availability and recovery. No token was rotated or revoked.

## Release preparation status (2026-11-04)

The npm CLI is authenticated as `cto-altegio`, whose verified role in the `altegio` organization is `owner`. The account's email is verified. Version `@altegio/ui@3.18.1` returned 404 immediately before dispatching the first-publication workflow; no public release is asserted until that workflow publishes and registry verification succeeds.

The public repository's `npm-public` environment requires approval from `petroff`, with administrator bypass disabled, and accepts only the protected `main` branch. Branch protection applies to administrators and disallows force pushes and deletion while preserving the source snapshot exporter's normal fast-forward pushes. The environment contains the approved `NPM_PUBLIC_TOKEN`: a bootstrap token limited to package publication within `@altegio`, with no organization-management permission and an expiry of November 11, 2026. Its account was authenticated before storage. The publish-enable variable is set. The [manual publication workflow](https://github.com/altegio/altegio-ui-public/actions/workflows/publish-public.yml) repeats the build and package checks, then requires the maintainer's approval for its concrete deployment. Later releases need a valid approved credential or separately configured trusted publishing; the bootstrap token is not a permanent credential.

The Inter v3.19 notice matches upstream byte for byte. The assembly verifies notices for bundled code against installed versions and copies font assets unchanged. The authorized owner explicitly approved redistribution of the font/icon assets and the release notes in PUBLIC_CHANGELOG.md on November 4, 2026. Source CI and the corresponding public-snapshot CI passed for the package and component changes. Review the final workflow artifact and its recorded integrity before approving publication; the tarball includes these release documents, so documentation edits also change its digest.

Historical Safari 14.1 and iOS 16 validation is tracked separately in [HISTORICAL_BROWSER_VALIDATION.md](./HISTORICAL_BROWSER_VALIDATION.md). The maintainer confirmed that neither an existing target nor an authorized testing service is available. Both historical targets remain unverified; current Playwright WebKit is not evidence for either target.

## Import migration

Replace `@platform/altegio-ui` with `@altegio/ui` for external consumers. Use `core/button`, `vue/button` or `angular/button` for one component; multiword component subpaths use kebab-case (`text-field`, `global-provider`). `core`, `vue` and `angular` keep the complete supported catalogs. The old `ng/button` paths remain private-only aliases of the full Angular catalog; switch to `angular/button` for a component or `angular` for the full catalog.

The external package exposes Alt-prefixed names only. Private legacy names and selectors require migration before changing package identities. Public snapshots are imported from internal main and replace the public tree. A community pull request must be accepted and applied in the source repository, then exported in the next snapshot; it is never merged directly into the snapshot tree.
