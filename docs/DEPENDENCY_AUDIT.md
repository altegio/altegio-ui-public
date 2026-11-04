# Dependency audit

Verified against the public npm advisory API on 2026-11-04, using Node 24.20.0, pnpm 10.34.5 and the committed lockfile. Run `pnpm audit-dependencies` to repeat both production and full audits. Reports are saved under `artifacts/validation/`.

Production dependencies have no advisories in this verification. The full audit has five affected development versions (one low, four moderate), down from six. Development tooling has the specific unresolved findings below. The gate accepts only these advisory IDs, severities and dependency paths; every new advisory/path, severity increase, incomplete response or audit error fails. These exceptions do not apply to the production audit.

## Updated supported dependencies

- `wait-on` 9.5.1 supports the repository's Node 24 runtime (upstream requires Node >=20). Its unchanged HTTP/port waiting interface is exercised in the consumer tests. The lockfile resolves patched `joi` >=18.3.1 and `follow-redirects` >=1.16.2, eliminating [GHSA-4528-x5fx-h6hg](https://github.com/advisories/GHSA-4528-x5fx-h6hg) and [GHSA-mrwp-f3q8-3g9p](https://github.com/advisories/GHSA-mrwp-f3q8-3g9p).
- Direct `glob` is upgraded to 14.0.3 (patched >=14.0.2) and exercised by the workspace, entry point and library builds. A transitive older major remains below.
- `vite-plugin-dts` 5.1.2 replaces its pinned Vue language-core 2.2.0 with the supported Vue 3 processor and explicit `@vue/language-core` 3.3.14 peer. This removes the minimatch 9 path. Its renamed `outDirs` and `bundleTypes` options, explicit source entry root and production source filters preserve bundled declarations; `@microsoft/api-extractor` 7.60.1 is now an explicit build peer. No transitive major override is used.
- The TypeScript ESLint parser/utils/metapackage are updated together to 8.72.1. They still support minimatch 10, so that exception remains.

## Unresolved upstream constraints

| Advisory | Severity | Exact development paths | Constraint |
| --- | --- | --- | --- |
| [GHSA-gcqx-w48m-w2h4](https://github.com/advisories/GHSA-gcqx-w48m-w2h4), deepmerge 4.3.1 | Low | `@storybook/angular > @storybook/builder-webpack5 > fork-ts-checker-webpack-plugin > deepmerge` | Upstream lists no patched release. Replacing it with a different merge implementation would change tooling behavior. |
| [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249), minimatch <11.0.1 | Moderate | `@storybook/angular > @storybook/builder-webpack5 > fork-ts-checker-webpack-plugin > minimatch`; `@typescript-eslint/parser > @typescript-eslint/typescript-estree > minimatch`; `@microsoft/api-extractor > minimatch` | Patched release is a major outside these parents' supported ranges. The old majors have different CommonJS/default-export contracts. No cross-major override is imposed. |
| [GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4), glob <14.0.2 | Moderate | `@vue/test-utils > js-beautify > glob` | The patched major is outside js-beautify's supported range. This is separate from the fixed direct glob dependency. |

These tools process repository build/lint/test configuration; the affected modules are not production dependencies of the public tarball. Public pull requests still execute code in CI, so jobs use read-only repository permissions and no publication credentials. Revisit the exceptions when the listed parents publish supported updates. Do not silence the audit or force incompatible majors to obtain a zero development count.

## Upstream recheck and gate verification

The npm registry metadata was rechecked on 2026-11-04. Latest deepmerge remains
4.3.1 with no patched release. Latest fork-ts-checker-webpack-plugin 9.1.0 still
requires deepmerge `^4.2.2` and minimatch `^3.0.4`; Storybook Angular/builder-webpack5
10.6.5 still uses that plugin. Latest typescript-estree 8.72.1 requires minimatch
`^10.2.2`; latest API Extractor 7.60.1 pins 10.2.3. Latest js-beautify 2.0.3 uses glob
`^13.0.6`, and Vue Test Utils 2.5.1 uses js-beautify `^2.0.0`. Updating those parents
cannot select patched minimatch 11 or glob 14 within their supported ranges.

The gate removes the obsolete Vue language-core exception and permits only the
remaining exact paths. It also rejects missing severity counts, missing advisory
details, empty affected-version/path lists and unexplained exit codes. Regression
tests exercise new advisories, paths, severity changes, malformed reports and
production findings; `pnpm audit-dependencies` runs them before the live audits.
