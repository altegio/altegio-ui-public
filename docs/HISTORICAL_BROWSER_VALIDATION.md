# Historical browser validation

The support contract remains Safari 14.1 on macOS and Safari on iOS 16. Current
Playwright WebKit, emulated mobile viewports and user-agent overrides are not
historical-browser evidence.

## Available targets (2026-11-04)

The validation workstation has macOS 27.2 / Safari 27.2, no Xcode, no simulator
runtimes, no `simctl`/`devicectl` and no attached USB device. No BrowserStack,
Sauce Labs, LambdaTest or TestingBot credentials/configuration were found in the
task environment or repository; GitLab has no corresponding project variable.
Both historical targets therefore remain unverified. An existing authorized Mac
with Safari 14.1 and an iOS 16 device/simulator, or an already authorized service
session providing those exact versions, is required. No paid session was created.

The maintainer explicitly chose to proceed with the first public release without
historical Safari validation on November 4, 2026. This release decision does not
change the browser baseline or mark either historical target as verified. The
checklist below remains available for future validation.

## Runnable validation preparation

Use the committed Node/pnpm versions and a clean checkout:

```sh
pnpm install --frozen-lockfile
pnpm public:build
pnpm test-public-package
pnpm test-public-consumers
python3 -m http.server 4173 --bind 0.0.0.0 --directory artifacts/consumers/built
```

On the target, open `http://HOST:4173/core-component/index.html`,
`/vue-component/index.html`, `/angular-component/index.html` and
`/composition-provider-form/index.html`. Use a reachable workstation address for
`HOST`; a service needs its supported local tunnel. These pages use the installed
tarball, not source aliases. Record the tarball SHA-256 from
`artifacts/public/package-info.json`, source commit, exact OS/browser version,
device/service session, result, screenshots and console errors.

In another terminal, expose the component stories:

```sh
pnpm exec storybook dev -c ./web/core/.storybook -p 6006 --host 0.0.0.0 --no-open
# Run separately for Vue and Angular when checking wrapper behavior:
pnpm exec storybook dev -c ./web/vue/.storybook -p 6007 --host 0.0.0.0 --no-open
pnpm exec storybook dev -c ./web/angular/.storybook -p 6008 --host 0.0.0.0 --no-open
```

## Minimum target checklist

Run every row on both real targets. Keep native behavior enabled; do not force a
fallback or replace the browser's identity. The existing forced-legacy automated
tests are additional regression coverage only.

| Scenario | Action and expected result |
| --- | --- |
| Installed package | All three component pages render their button, fonts and CSS without console errors. |
| Forms / CVA | On the installed composition page, change Consumer email, submit, and inspect `window.consumerSubmission.email`; it equals the new value. In Angular Form stories exercise model-to-view changes, typing, blur/touched, disable/enable and reset. No duplicate change notifications. |
| Validation | In Form stories submit empty required controls, then correct them. Invalid submission is blocked; messages clear after correction. Set external field errors through story controls/examples; preserve them until edited or explicitly cleared. |
| Disabled | Disable a field and a containing fieldset. Mouse, keyboard and touch cannot change disabled controls; disabled values are omitted from submitted FormData. Re-enable and verify interaction resumes. |
| Reset | Edit text, numeric, checkbox, radio, select and date controls, then reset. Restore initial/default values, clear stale errors and keep framework model and submitted values in sync. |
| Dropdown / select | Open with keyboard and touch; use arrows, Enter, Escape and outside click. Focus returns correctly, selection is retained and the popup remains positioned while scrolling. |
| Date picker | Open, navigate months, select and clear a date; check keyboard focus, disabled dates and submitted date value. |
| Visual / RTL | At narrow and desktop widths inspect labels, errors, icons, focus rings and popup clipping. Repeat with the document direction set to `rtl`; start/end alignment and popup placement mirror correctly. Capture screenshots without updating Linux reference images. |

If a story cannot express a step, use the corresponding source regression as the
fixture specification: Core `Form.behavior.test.ts` / `Form.fields.test.ts`,
Angular `FormControl.test.ts`, Core `SelectField.keyboard.test.ts`,
`Dropdown.transition.test.ts` and the date-picker/visual tests. Record a missing
fixture as incomplete validation, never as a pass. Do not change the supported
browser baseline to close this checklist.
