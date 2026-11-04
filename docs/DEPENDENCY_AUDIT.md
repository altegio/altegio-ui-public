# Dependency audit

Verified against the public npm advisory API on 2026-11-03, using Node 24.20.0, pnpm 10.34.5 and the committed lockfile. Run `pnpm audit-dependencies` to repeat both production and full audits. Reports are saved under `artifacts/validation/`.

Production dependencies have no advisories in this verification. Development tooling has the specific unresolved findings below. The gate accepts only these advisory IDs, severities and dependency paths; every new advisory/path, severity increase, incomplete response or audit error fails. These exceptions do not apply to the production audit.

## Updated supported dependencies

- `wait-on` 9.5.1 supports the repository's Node 24 runtime (upstream requires Node >=20). Its unchanged HTTP/port waiting interface is exercised in the consumer tests. The lockfile resolves patched `joi` >=18.3.1 and `follow-redirects` >=1.16.2, eliminating [GHSA-4528-x5fx-h6hg](https://github.com/advisories/GHSA-4528-x5fx-h6hg) and [GHSA-mrwp-f3q8-3g9p](https://github.com/advisories/GHSA-mrwp-f3q8-3g9p).
- Direct `glob` is upgraded to 14.0.3 (patched >=14.0.2) and exercised by the workspace, entry point and library builds. A transitive older major remains below.

## Unresolved upstream constraints

| Advisory | Severity | Exact development paths | Constraint |
| --- | --- | --- | --- |
| [GHSA-gcqx-w48m-w2h4](https://github.com/advisories/GHSA-gcqx-w48m-w2h4), deepmerge 4.3.1 | Low | `@storybook/angular > @storybook/builder-webpack5 > fork-ts-checker-webpack-plugin > deepmerge` | Upstream lists no patched release. Replacing it with a different merge implementation would change tooling behavior. |
| [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249), minimatch <11.0.1 | Moderate | `@storybook/angular > @storybook/builder-webpack5 > fork-ts-checker-webpack-plugin > minimatch`; `@typescript-eslint/parser > @typescript-eslint/typescript-estree > minimatch`; `vite-plugin-dts > @microsoft/api-extractor > minimatch`; `vite-plugin-dts > @vue/language-core > minimatch` | Patched release is a major outside these parents' supported ranges. The old majors have different CommonJS/default-export contracts. No cross-major override is imposed. |
| [GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4), glob <14.0.2 | Moderate | `@vue/test-utils > js-beautify > glob` | The patched major is outside js-beautify's supported range. This is separate from the fixed direct glob dependency. |

These tools process repository build/lint/test configuration; the affected modules are not production dependencies of the public tarball. Public pull requests still execute code in CI, so jobs use read-only repository permissions and no publication credentials. Revisit the exceptions when the listed parents publish supported updates. Do not silence the audit or force incompatible majors to obtain a zero development count.
