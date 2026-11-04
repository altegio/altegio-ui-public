import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { colord } from 'colord'
import { expectNoAxeViolations } from '~shared/tests/a11y'
import { contrastRatio } from '~tokens/palette'
import { composedForm, controlMatrix, controlRows, deepElement, loadVisualFont, nativeButton } from './fixtures'

beforeAll(loadVisualFont)

beforeEach(async() => {
  await page.viewport(1280, 1100)
  await userEvent.unhover(document.body)
})

afterEach(() => {
  document.querySelectorAll('.visual-system').forEach((root) => { root.remove() })
})

const resolvedColor = (root: HTMLElement, role: string) => getComputedStyle(root).getPropertyValue(`--alt-core-color-${role}`).trim()

describe('visual foundations', () => {
  for (const dark of [false, true]) {
    for (const dir of ['ltr', 'rtl'] as const) {
      const theme = `${dark ? 'dark' : 'light'}-${dir}`

      it(`aligns control sizes, labels, hints and states in ${theme}`, async() => {
        const root = await controlMatrix(dark, dir)
        for (const { size } of controlRows.slice(0, 3)) {
          const controls = root.querySelectorAll<HTMLElement>(`[data-row="${size}-default"]`)
          const expectedHeight = { small: 32, medium: 40, large: 48 }[size]
          const heights = Array.from(controls).map((control, index) => index === 0
            ? nativeButton(control).getBoundingClientRect().height
            : deepElement(control, 'alt-core-field-wrapper').getBoundingClientRect().height)
          expect(heights, size).toEqual([expectedHeight, expectedHeight, expectedHeight, expectedHeight])
          const fieldHeights = Array.from(controls).slice(1).map((control) => control.getBoundingClientRect().height)
          expect(new Set(fieldHeights).size, 'empty annotations add no space').toBe(1)
        }

        for (const control of root.querySelectorAll<HTMLElement>('[data-row="medium-long"]')) {
          const bounds = control.getBoundingClientRect()
          expect(control.scrollWidth, 'long content stays inside its allocated column').toBeLessThanOrEqual(bounds.width + 1)
        }
        const date = root.querySelector<HTMLElement>('alt-core-date-picker')!
        const input = deepElement(date, 'input')
        expect(getComputedStyle(input).paddingInlineStart).toBe('12px')
        expect(getComputedStyle(input).paddingInlineEnd).toBe('0px')
        const dateIcon = deepElement(date, 'alt-core-field-icon')
        const inputBounds = input.getBoundingClientRect()
        const iconBounds = dateIcon.getBoundingClientRect()
        expect(dir === 'ltr' ? inputBounds.right <= iconBounds.left + 1 : inputBounds.left >= iconBounds.right - 1).toBe(true)

        const primary = resolvedColor(root, 'surface-primary')
        for (const role of ['text-secondary', 'text-negative', 'text-accent']) {
          expect(contrastRatio(resolvedColor(root, role), primary), role).toBeGreaterThanOrEqual(4.5)
        }
        expect(contrastRatio(resolvedColor(root, 'focus-ring'), primary)).toBeGreaterThanOrEqual(3)
        const loadingButton = root.querySelector<HTMLElement>('[data-row="medium-loading"][data-column="0"]')!
        const spinner = deepElement(loadingButton, '.alt-core-loader')
        expect(contrastRatio(getComputedStyle(spinner).color, resolvedColor(root, 'surface-accent'))).toBeGreaterThanOrEqual(3)
        const switches = Array.from(root.querySelectorAll('alt-core-toggle')).map((toggle) => deepElement(toggle, '.alt-core-simple-toggle'))
        const thumbOffsets = switches.map((control) => {
          const thumb = deepElement(control, '.alt-core-simple-toggle__switch-thumb')
          const controlStyle = getComputedStyle(control)
          const thumbBorder = getComputedStyle(thumb).getPropertyValue('--alt-core-simple-toggle-thumb-border-color').trim()
          expect(contrastRatio(thumbBorder, controlStyle.backgroundColor, primary)).toBeGreaterThanOrEqual(3)
          return thumb.getBoundingClientRect().left - control.getBoundingClientRect().left
        })
        expect(dir === 'ltr' ? thumbOffsets[1] > thumbOffsets[0] : thumbOffsets[1] < thumbOffsets[0]).toBe(true)
        await expectNoAxeViolations(root)
        await expect.element(page.getByTestId('visual-system')).toMatchScreenshot(`controls-${theme}`)
      })

      it(`keeps composed form geometry and real hover/focus states in ${theme}`, async() => {
        const { root, focusButton, search } = await composedForm(dark, dir)
        const button = nativeButton(focusButton)
        button.focus()
        await userEvent.keyboard('{Tab}{Shift>}{Tab}{/Shift}')
        expect(button.matches(':focus-visible')).toBe(true)
        const buttonStyle = getComputedStyle(button)
        expect(buttonStyle.outlineStyle).toBe('solid')
        expect(Number.parseFloat(buttonStyle.outlineWidth)).toBeGreaterThanOrEqual(2)
        expect(contrastRatio(buttonStyle.outlineColor, resolvedColor(root, 'surface-secondary-fill'))).toBeGreaterThanOrEqual(3)
        await expect.element(page.getByTestId('visual-system')).toMatchScreenshot(`form-button-focus-${theme}`)

        await userEvent.keyboard('{Tab}')
        const input = deepElement(search, 'input')
        expect(input.matches(':focus')).toBe(true)
        const wrapper = deepElement(search, '.alt-core-field-wrapper')
        expect(getComputedStyle(wrapper).boxShadow).toContain(colord(resolvedColor(root, 'focus-ring')).toRgbString())
        await userEvent.hover(button)
        expect(getComputedStyle(button).backgroundColor).toBe(colord(resolvedColor(root, 'surface-accent-high')).toRgbString())
        await expectNoAxeViolations(root)
        await expect.element(page.getByTestId('visual-system')).toMatchScreenshot(`form-field-focus-hover-${theme}`)

        await userEvent.keyboard('{Tab}{Tab}{Tab}')
        const errorField = root.querySelector('form alt-core-select-field')!
        const errorWrapper = deepElement(errorField, '.alt-core-field-wrapper')
        expect(errorWrapper.classList.contains('alt-core-field-wrapper_focused')).toBe(true)
        expect(getComputedStyle(errorWrapper).outlineStyle).toBe('solid')
        expect(Number.parseFloat(getComputedStyle(errorWrapper).outlineWidth)).toBeGreaterThanOrEqual(2)
        expect(contrastRatio(getComputedStyle(errorWrapper).outlineColor, resolvedColor(root, 'surface-primary'))).toBeGreaterThanOrEqual(3)
      })
    }
  }
})
