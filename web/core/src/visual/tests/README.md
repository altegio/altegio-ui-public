# Visual foundations regressions

`VisualSystem.visual.test.ts` runs in the Vitest `visual` browser project. The fixtures cover control
sizes (32/40/48px), error/disabled/loading/readonly states, hints, long labels, leading/trailing icons,
light/dark themes and LTR/RTL. Composed form/toolbar fixtures exercise real keyboard focus and hover,
including focus on an invalid field. Geometry, contrast and axe assertions run before screenshots.

The viewport is 1280×1100 at Playwright's default device scale 1. Screenshots crop the 1200px fixture.
The bundled Inter variable font is loaded without system-font fallbacks, motion is frozen inside the
fixture's shadow trees, and dates are explicit. Baselines are separate for Darwin and Linux.

```sh
pnpm install --frozen-lockfile
pnpm vars-build
pnpm exec playwright install --with-deps chromium
CI=1 pnpm test-unit --project visual
```

Linux references were generated and reviewed in Debian bookworm/amd64 with Node 24.20.0
(`node@sha256:9137a20e25879e0b557227b57e3ee4e9af4bde29eb3db66134cd1723e84f830b`),
pnpm 10.34.5, the frozen repository lockfile, Playwright 1.64.1, and Chromium 156.0.8078.4 (build 1248).
These match the CI Node image and locked browser dependency. For an intentional visual change, run
the targeted command with `--update` in that environment, inspect every changed image, and rerun
without `--update`. CI always compares the committed references.

CI artifact collection should include `web/core/src/visual/tests/__screenshots__/` alongside the
existing `.vitest/attachments/` failure artifacts.
