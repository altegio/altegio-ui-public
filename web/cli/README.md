# Altegio UI component CLI

The `yds` CLI scaffolds and updates Altegio UI components for Lit, Vue, and Angular. Vue and Angular components wrap the core Lit components.

## Build

Install the project dependencies and generate shared assets with `make init` from the repository root, then build the CLI:

```bash
pnpm cli-build
```

This creates `web/cli/build/yds.mjs` and links the `yds` command globally through pnpm. If pnpm reports that its global executable directory is missing, configure it with `pnpm setup` and reopen your shell before running the build again.

You can also run the generated executable directly:

```bash
node web/cli/build/yds.mjs --help
```

## Create a component

Run from the repository root:

```bash
yds create
```

The interactive prompts collect the component settings and generate files for the selected platform.

## Update a component

```bash
yds update
```

The interactive prompts collect the settings needed to update an existing component. Review the generated changes, update its Storybook examples, and run the relevant tests before committing.
