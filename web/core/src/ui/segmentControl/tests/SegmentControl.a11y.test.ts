import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreSegmentControlTagName as tagName } from '~shared/constants'
import { altInfo } from '~shared/icons/build/alt-info.icon'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreSegmentControl } from '~core/ui/segmentControl'
import type { AltCoreSegmentOption } from '~core/ui/segmentOption'
import type { ClickEvent, IAltCoreSegmentControlOption } from '~core/ui/segmentControl/models/types'
import '~core/ui/segmentControl'

const createOptions = (disabledValues: string[] = []): IAltCoreSegmentControlOption[] => [
  'day',
  'week',
  'month',
].map((value) => ({
  active: false,
  text: value,
  value,
  disabled: disabledValues.includes(value),
}))

const mountSegmentControl = async({ disabledValues = [] as string[], manual = false, value = undefined as string | undefined } = {}) => {
  const segmentControl = document.createElement(tagName)
  segmentControl.options = createOptions(disabledValues)
  segmentControl.accessibleName = 'Calendar view'
  segmentControl.manual = manual
  segmentControl.value = value
  document.body.append(segmentControl)
  await waitForLitTree(segmentControl)

  return segmentControl
}

const getOptions = (segmentControl: AltCoreSegmentControl) => Array.from(segmentControl.shadowRoot?.querySelectorAll<AltCoreSegmentOption>('alt-core-segment-option') ?? [])

const checkedValues = (segmentControl: AltCoreSegmentControl) => getOptions(segmentControl)
  .filter((option) => option.getAttribute('aria-checked') === 'true')
  .map((option) => option.value)

const tabStops = (segmentControl: AltCoreSegmentControl) => getOptions(segmentControl)
  .filter((option) => option.tabIndex === 0)
  .map((option) => option.value)

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreSegmentControl/Accessibility', () => {
  it('exposes a named radio group of options', async() => {
    const segmentControl = await mountSegmentControl({ disabledValues: ['month'] })
    const options = getOptions(segmentControl)

    expect(segmentControl.shadowRoot?.querySelector('[role="radiogroup"]')?.getAttribute('aria-label')).toBe('Calendar view')
    expect(options.map((option) => option.getAttribute('role'))).toEqual([
      'radio',
      'radio',
      'radio',
    ])
    expect(checkedValues(segmentControl)).toEqual(['day'])
    expect(options[2].getAttribute('aria-disabled')).toBe('true')
    await expectNoAxeViolations(segmentControl, PATTERN_AXE_OPTIONS)
  })

  it('names icon-only options with their accessibleName', async() => {
    const segmentControl = document.createElement(tagName)
    segmentControl.options = [
      { active: true, text: '', value: 'info', icon: altInfo, accessibleName: 'Information' },
      { active: false, text: 'List', value: 'list' },
    ]
    document.body.append(segmentControl)
    await waitForLitTree(segmentControl)

    expect(getOptions(segmentControl)[0].getAttribute('aria-label')).toBe('Information')
    expect(getOptions(segmentControl)[1].hasAttribute('aria-label')).toBe(false)
    await expectNoAxeViolations(segmentControl, PATTERN_AXE_OPTIONS)
  })

  it('keeps only the active option in the tab order', async() => {
    const segmentControl = await mountSegmentControl({ manual: true, value: 'week' })

    expect(tabStops(segmentControl)).toEqual(['week'])

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(getOptions(segmentControl)[1])
  })

  it('moves focus and selects the next option with arrow keys, wrapping around and skipping disabled options', async() => {
    const segmentControl = await mountSegmentControl({ disabledValues: ['week'] })
    const options = getOptions(segmentControl)
    const onClick = vi.fn()
    segmentControl.addEventListener('click', (event) => {
      onClick((event as unknown as ClickEvent).detail.value)
    })

    await userEvent.tab()
    await userEvent.keyboard('{ArrowRight}')
    await waitForLitTree(segmentControl)
    expect(getDeepActiveElement()).toBe(options[2])
    expect(checkedValues(segmentControl)).toEqual(['month'])
    expect(tabStops(segmentControl)).toEqual(['month'])

    await userEvent.keyboard('{ArrowDown}')
    await waitForLitTree(segmentControl)
    expect(getDeepActiveElement()).toBe(options[0])

    await userEvent.keyboard('{ArrowLeft}')
    await userEvent.keyboard('{ArrowUp}')
    await waitForLitTree(segmentControl)
    expect(checkedValues(segmentControl)).toEqual(['day'])
    expect(onClick.mock.calls).toEqual([
      ['month'],
      ['day'],
      ['month'],
      ['day'],
    ])
  })

  it('leaves the selection to the consumer in manual mode', async() => {
    const segmentControl = await mountSegmentControl({ manual: true, value: 'day' })
    const onClick = vi.fn()
    segmentControl.addEventListener('click', (event) => {
      onClick((event as unknown as ClickEvent).detail.value)
    })

    await userEvent.tab()
    await userEvent.keyboard('{ArrowRight}')
    await waitForLitTree(segmentControl)

    expect(onClick).toHaveBeenCalledWith('week')
    expect(checkedValues(segmentControl)).toEqual(['day'])
    expect(getDeepActiveElement()).toBe(getOptions(segmentControl)[1])

    await userEvent.keyboard(' ')
    expect(onClick).toHaveBeenLastCalledWith('week')
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('reverses ArrowLeft and ArrowRight in a right-to-left layout', async() => {
    const segmentControl = await mountSegmentControl()
    segmentControl.dir = 'rtl'
    const options = getOptions(segmentControl)

    await userEvent.tab()
    await userEvent.keyboard('{ArrowLeft}')
    await waitForLitTree(segmentControl)
    expect(getDeepActiveElement()).toBe(options[1])

    await userEvent.keyboard('{ArrowRight}')
    await waitForLitTree(segmentControl)
    expect(getDeepActiveElement()).toBe(options[0])
  })
})
