import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreStepperTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreStepper } from '~core/ui/stepper'
import type { StepperChangeEvent } from '~core/ui/stepper/models/types'
import type { AltCoreStep } from '~core/ui/step'
import '~core/ui/stepper'
import '~core/ui/step'

const STEPS = `
  <alt-core-step name="details" title="Details" caption="Name and contacts" done>Details content</alt-core-step>
  
  <alt-core-step name="services" title="Services">Services content</alt-core-step>
  
  <alt-core-step name="check" title="Check" disabled>Check content</alt-core-step>
  
  <alt-core-step name="payment" title="Payment" error>Payment content</alt-core-step>
`

const mountStepper = async(props: Partial<AltCoreStepper> = {}, innerHTML = STEPS) => {
  const stepper = document.createElement(tagName)
  Object.assign(stepper, props)
  stepper.innerHTML = innerHTML
  document.body.append(stepper)
  await waitForLitTree(stepper)

  return stepper
}

const getHeaderItems = (stepper: AltCoreStepper) => Array.from(stepper.shadowRoot?.querySelectorAll<HTMLElement>('li') ?? [])

const getSteps = (stepper: AltCoreStepper) => Array.from(stepper.querySelectorAll<AltCoreStep>('alt-core-step'))

const getShownSteps = (stepper: AltCoreStepper) => getSteps(stepper).filter((step) => step.checkVisibility()).map((step) => step.name)

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreStepper/Accessibility', () => {
  it('lists the steps in a named ordered list and marks the current one', async() => {
    const stepper = await mountStepper({ value: 'services' })
    const list = stepper.shadowRoot?.querySelector('ol')

    expect(list?.getAttribute('aria-label')).toBe('Steps')
    expect(getHeaderItems(stepper).map((item) => item.getAttribute('aria-current'))).toEqual([null, 'step', null, null])
    expect(getHeaderItems(stepper).map((item) => item.textContent.replace(/\s+/g, ' ').trim())).toEqual([
      'Details Name and contacts done',
      '2 Services',
      '3 Check unavailable',
      'Payment error',
    ])
    expect(getShownSteps(stepper)).toEqual(['services'])
    expect(getSteps(stepper).map((step) => [step.getAttribute('role'), step.getAttribute('aria-label')])).toContainEqual(['group', 'Services'])
    await expectNoAxeViolations(stepper, PATTERN_AXE_OPTIONS)
  })

  it('opens the first step without a value', async() => {
    const stepper = await mountStepper()

    expect(getShownSteps(stepper)).toEqual(['details'])
    expect(getHeaderItems(stepper)[0].getAttribute('aria-current')).toBe('step')
  })

  it('makes the headers of enabled steps buttons with headerNav, and opens a step from the keyboard', async() => {
    const stepper = await mountStepper({ value: 'details', headerNav: true })
    const onChange = vi.fn()
    stepper.addEventListener('change', onChange)
    const buttons = getHeaderItems(stepper).map((item) => item.querySelector('button'))

    expect(buttons.map(Boolean)).toEqual([true, true, false, true])

    await userEvent.tab()
    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(buttons[1])
    await userEvent.keyboard('{Enter}')
    await waitForLitTree(stepper)

    expect(stepper.value).toBe('services')
    expect(getShownSteps(stepper)).toEqual(['services'])
    expect((onChange.mock.lastCall?.[0] as StepperChangeEvent).detail.value).toBe('services')
    await expectNoAxeViolations(stepper, PATTERN_AXE_OPTIONS)
  })

  it('has no header buttons without headerNav', async() => {
    const stepper = await mountStepper()

    expect(stepper.shadowRoot?.querySelector('button')).toBeNull()
  })

  it('moves to the neighbouring enabled step with next() and previous()', async() => {
    const stepper = await mountStepper({ value: 'services' })
    const onChange = vi.fn()
    stepper.addEventListener('change', onChange)

    stepper.next()
    await waitForLitTree(stepper)
    expect(stepper.value).toBe('payment')

    stepper.next()
    expect(stepper.value).toBe('payment')

    stepper.previous()
    await waitForLitTree(stepper)
    expect(stepper.value).toBe('services')
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('redraws the header when a step changes', async() => {
    const stepper = await mountStepper({ value: 'services' })

    getSteps(stepper)[1].done = true
    getSteps(stepper)[1].title = 'Services picked'
    await waitForLitTree(stepper)

    expect(getHeaderItems(stepper)[1].textContent.replace(/\s+/g, ' ').trim()).toBe('Services picked done')
  })
})
