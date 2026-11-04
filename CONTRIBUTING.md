# Contributing to Altegio UI

Thank you for helping to improve Altegio UI. This guide explains how contributions reach the code, since this repository works differently from most open-source projects.

## How this repository works

Altegio UI is developed in Altegio's internal source repository. The [public repository](https://github.com/altegio/altegio-ui-public) receives a snapshot of the source `main` branch after changes land there: each snapshot replaces the whole tree in a single "Update public code snapshot" commit. The internal history, branches, and package releases are not mirrored, so the public repository has no tags or releases.

As a result, pull requests are never merged here: the next snapshot would overwrite them. Instead:

1. You open an issue or a pull request in the public repository.
2. A maintainer reviews it here and agrees on the change with you.
3. The maintainer applies the accepted change in the source repository and credits you in that commit.
4. The change appears in the next public snapshot, and the maintainer closes your pull request with a link to it.

A pull request is still the best way to propose a concrete change: it shows the exact diff, runs the checks in GitHub Actions, and gives the review a place to happen.

## Reporting bugs and proposing changes

Open a [GitHub issue](https://github.com/altegio/altegio-ui-public/issues) for bugs, missing features, and API proposals. For a bug, include:

- the package version, framework (web components, Vue, or Angular), and browser;
- a minimal reproduction, such as a Storybook story or a small project;
- what you expected and what happened instead.

Do not report security vulnerabilities in public issues; follow the [security policy](./SECURITY.md) instead.

## Setting up

Follow the [quick start](./README.md#quick-start) to install dependencies and run Storybook. The [README](./README.md) also describes the repository layout, the builds, and the component CLI.

## Making a change

- Implement component behavior in the Lit web component under `web/core`, then update the Vue and Angular wrappers under `web/vue` and `web/angular` so that all three integrations stay in sync.
- Use the `Alt` prefix for public names: `AltButton`, `alt-core-button`, `--alt-core-*`.
- Add or update the unit tests next to the component (`tests/`) and its Storybook stories (`stories/`).
- Keep public API changes backward compatible. When something must change, keep the old name as a deprecated alias and describe the change in the pull request.
- Write code, comments, and documentation in English.
- Write commit messages in the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format, for example `fix(vue): forward the disabled prop to AltButton`. The commit message hook checks the format.

## Before you open a pull request

Run the checks that GitHub Actions runs on every pull request:

```bash
pnpm typecheck
make lint
pnpm test-token-compat
pnpm exec playwright install chromium firefox webkit
pnpm test-unit
TEST_BROWSER=firefox pnpm test-unit
TEST_BROWSER=webkit pnpm test-unit
```

When you change the build or the package entry points, also run:

```bash
make lib-build
pnpm test-package-compat
pnpm test-dist-compat
pnpm public:build
pnpm test-public-package
pnpm test-public-consumers
pnpm audit-dependencies
pnpm test-public-export
```

The package identity is `@altegio/ui`; source snapshots keep their development manifest private. Only `public:build` creates a publishable local tarball. Publication is a separate maintainer-approved process in [PUBLICATION.md](./docs/PUBLICATION.md). Public package releases must include English notes in PUBLIC_CHANGELOG.md. Never merge a community pull request directly into the snapshot repository.

In the pull request, describe the problem, the change, and how you tested it. Screenshots help for visual changes.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](./LICENSE) that covers this project.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold it.
