import { afterEach, describe, expect, it } from 'vitest'
import { colord } from 'colord'
import { PaletteModule } from '../context/modules/PaletteModule'
import { expectNoAxeViolations, waitForLitTree } from '~shared/tests/a11y'
import { contrastRatio } from '~tokens/palette'
import '~core/ui/button'
import '~core/ui/checkbox'
import '~core/ui/calendar'
import '~core/ui/textarea'

let root: HTMLElement | undefined

afterEach(() => {
  root?.remove()
})

async function expectTextareaStates(root: HTMLElement) {
  const [active, disabled] = Array.from(root.querySelectorAll('alt-core-textarea'))
    .map((host) => host.shadowRoot!.querySelector('alt-core-field-textarea')!)
  const input = active.shadowRoot!.querySelector('textarea')!
  const disabledInput = disabled.shadowRoot!.querySelector('textarea')!
  const surface = getComputedStyle(root).getPropertyValue('--alt-core-color-surface-primary').trim()
  const placeholderStyle = getComputedStyle(input, '::placeholder')
  const placeholder = colord(placeholderStyle.color)
  const paintedPlaceholder = placeholder.alpha(placeholder.alpha() * Number(placeholderStyle.opacity)).toRgbString()
  expect(contrastRatio(paintedPlaceholder, surface)).toBeGreaterThanOrEqual(4.5)
  expect(disabledInput.disabled).toBe(true)
  expect(getComputedStyle(disabledInput, '::placeholder').color).toBe(getComputedStyle(disabledInput).color)

  root.dir = 'rtl'
  active.hideSpaceLeft = true
  await active.updateComplete
  expect(getComputedStyle(input).paddingInlineStart).toBe('0px')
  expect(getComputedStyle(input).paddingInlineEnd).toBe('12px')
  active.hideSpaceLeft = false
  active.hideSpaceRight = true
  await active.updateComplete
  expect(getComputedStyle(input).paddingInlineStart).toBe('12px')
  expect(getComputedStyle(input).paddingInlineEnd).toBe('0px')
}

describe('rendered semantic palettes', () => {
  for (const dark of [false, true]) {
    for (const accent of ['#ffcb00', '#0077ff', '#000000', '#ffffff']) {
      it(`keeps accent states and textarea placeholders readable for ${accent}/${dark ? 'dark' : 'light'}`, async() => {
        root = document.createElement('main')
        root.style.cssText = 'padding:24px;background:var(--alt-core-color-surface-primary);color:var(--alt-core-color-text-primary)'
        const palette = new PaletteModule({ id: 'rendered', accentColor: colord(accent), useDarkTheme: dark, target: root })
        expect(palette.target).toBe(root)
        root.innerHTML = '<alt-core-button label="Book appointment"></alt-core-button><alt-core-checkbox checked label-text="Send reminders"></alt-core-checkbox><alt-core-calendar date="2026-11-03" min-date="2026-01-01" max-date="2026-12-31"></alt-core-calendar><alt-core-textarea label-text="Notes" placeholder="Notes for the team"></alt-core-textarea><alt-core-textarea disabled label-text="Unavailable notes" placeholder="Notes are unavailable"></alt-core-textarea>'
        document.body.append(root)
        await waitForLitTree(root, 5)

        await expectTextareaStates(root)
        await expectNoAxeViolations(root)
      })
    }
  }
})
