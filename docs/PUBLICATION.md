# Public beta releases

Altegio UI is **beta and under active development**. The public API may change before 1.0.

## Version and distribution channels

`public-release.json` is the independent version source for `@altegio/ui`. The current candidate is **0.3.18**. Both the public source manifest and assembled npm tarball use this version; public release checks reject versions outside the 0.x series. Change this file and add reviewed notes to [PUBLIC_CHANGELOG.md](../PUBLIC_CHANGELOG.md) for each release. Private release automation does not advance the public version.

The protected publication workflow publishes with provenance to `beta`, verifies the registry artifact, then points `latest` to that same version. Thus both commands install the current beta:

```sh
npm install @altegio/ui
npm install @altegio/ui@beta
```

Use `npm install --save-exact @altegio/ui@0.3.18` to pin this release. A source snapshot is not an npm publication; check [npm](https://www.npmjs.com/package/@altegio/ui) for availability.

The previously published 3.18.1 remains available and immutable. Moving npm tags to 0.x does not downgrade applications pinned to 3.x or change their lockfiles. Existing users must explicitly select a 0.x version to adopt the beta series.

## Build and test a candidate

Use Node 24.20.0 and pnpm 10.34.5:

```sh
pnpm install --frozen-lockfile
pnpm public:build
pnpm test-public-package
pnpm test-public-consumers
pnpm audit-dependencies
pnpm test-public-export
```

The build writes `artifacts/public/package/`, `artifacts/public/altegio-ui-VERSION.tgz` and `artifacts/public/package-info.json` with integrity and SHA-256. It assembles canonical runtime code, declarations, CLI, assets and legal notices, excluding development files and delivery configuration. Repeating the build with the same toolchain, lockfile and source produces the same tarball.

Install the candidate in an application with `npm install /absolute/path/to/artifacts/public/altegio-ui-VERSION.tgz`. Add the optional Vue 3 or Angular 22 peers for that integration. See the [README](../README.md#install) for supported imports and setup.

The consumer gate installs the actual tarball into an isolated directory, checks public types, compiles Core/Vue and Angular AOT applications, measures bundle sizes and checks rendering and composition in Chromium, Firefox and WebKit. It does not alias imports to repository source. [Consumer validation](./CONSUMER_VALIDATION.md) describes the checks; [historical browser validation](./HISTORICAL_BROWSER_VALIDATION.md) records the remaining device coverage limit.

## Protected publication workflow

1. Choose an unused 0.x version in `public-release.json` and review its public notes, API changes and any new asset notices. Run the candidate checks and pass source and public-snapshot CI.
2. Dispatch [Publish approved public package](https://github.com/altegio/altegio-ui-public/actions/workflows/publish-public.yml) on protected `main`, supplying the reviewed version and `publish @altegio/ui VERSION`. The workflow checks version agreement and registry availability, rebuilds and tests the candidate, and records the tarball integrity.
3. Review the concrete artifact and approve its deployment through the existing `npm-public` environment. The workflow uses the configured package publication credential and npm provenance; environment protection and repository publication controls remain mandatory.
4. Verify the published version, integrity, provenance and both `beta` and `latest` tags. Install from npm in a fresh application without authentication and run the consumer checks. If publication succeeded but tag promotion failed, verify that same artifact before retrying only the tag update; do not attempt to overwrite the version.

Source snapshots keep their development manifest `private: true`; only the assembled tarball is publishable. Never publish the source checkout or use private semantic-release history to choose a public version. Historical packages, Git tags and releases remain intact.
