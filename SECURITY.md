# Security policy

## Supported versions

Security fixes target the current public 0.x beta release of `@altegio/ui` and reach source users through the next snapshot. The project is under active development; the public API may change before 1.0. Report the installed npm version and, for source builds, the snapshot commit.

Dependency audit verification and the narrowly scoped development-tool exceptions are recorded in [DEPENDENCY_AUDIT.md](./docs/DEPENDENCY_AUDIT.md). Production audit findings are not accepted by that gate.

## Reporting a vulnerability

Please do not report security vulnerabilities through public issues, discussions, or pull requests.

Report them privately through GitHub instead: open the repository's **Security** tab and choose **Report a vulnerability**, or use [this form](https://github.com/altegio/altegio-ui-public/security/advisories/new). Only the maintainers can see the report.

Include as much of the following as you can:

- the affected component, entry point, or file;
- the package version and the framework (web components, Vue, or Angular);
- steps to reproduce, or a proof of concept;
- the impact you expect an attacker could achieve.

The maintainers will confirm the report, keep you updated in the private advisory while they investigate, and credit you in the advisory when the fix is published unless you prefer to stay anonymous.
