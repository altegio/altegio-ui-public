import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { AltCoreStepperTagName, AltCoreStepTagName } from '~shared/constants'
import { AltStepper } from '~vue/ui/stepper'
import { AltStep } from '~vue/ui/step'
import type { AltCoreStepper } from '~core/ui/stepper'
import type { AltCoreStep } from '~core/ui/step'

const mountStepper = (modelValue = 'a') => mount(AltStepper, {
  attachTo: document.body,
  props: { modelValue, orientation: 'vertical', headerNav: true, accessibleName: 'Import' },
  slots: {
    default: () => [
      h(AltStep, { name: 'a', title: 'A', caption: 'First', done: true }, () => 'A content'),
      h(AltStep, { name: 'b', title: 'B', error: true, disabled: true }, () => 'B content'),
      h(AltStep, { name: 'c', title: 'C' }, () => 'C content'),
    ],
  },
})

describe(
  'Vue/AltStepper',
  () => {
    it(
      'Should pass props to the core stepper and steps',
      () => {
        const wrapper = mountStepper()
        const stepper = wrapper.find(AltCoreStepperTagName).element as AltCoreStepper
        const steps = wrapper.findAll(AltCoreStepTagName).map((step) => step.element as AltCoreStep)

        expect([stepper.value, stepper.orientation, stepper.headerNav, stepper.accessibleName]).toEqual(['a', 'vertical', true, 'Import'])
        expect(steps.map((step) => [step.name, step.title, step.caption, step.done, step.error, step.disabled])).toEqual([
          ['a', 'A', 'First', true, false, false],
          ['b', 'B', undefined, false, true, true],
          ['c', 'C', undefined, false, false, false],
        ])
      },
    )

    it(
      'The core "change" event should emit "update:modelValue" once',
      () => {
        const wrapper = mountStepper()

        wrapper.find(AltCoreStepperTagName).element.dispatchEvent(new CustomEvent('change', { detail: { value: 'c' }, bubbles: true, composed: true }))

        expect(wrapper.emitted('update:modelValue')).toEqual([['c']])
      },
    )

    it(
      'Should expose next() and previous()',
      async() => {
        const wrapper = mountStepper()
        const stepper = wrapper.find(AltCoreStepperTagName).element as AltCoreStepper
        await stepper.updateComplete;
(wrapper.vm as unknown as { next: () => void }).next()

        expect(wrapper.emitted('update:modelValue')).toEqual([['c']])
        wrapper.unmount()
      },
    )
  },
)
