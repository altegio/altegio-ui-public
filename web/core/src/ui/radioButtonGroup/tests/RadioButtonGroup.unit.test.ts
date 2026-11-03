import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { text } from '~shared/tests/slotContents'
import {
  AltCoreRadioButtonGroupTagName as tagName,
  AltCoreRadioButtonTagName,
  AltCoreLabelTagName,
} from '~web/shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  getShadowElement,
  getElementClasses,
  getShadowRootElement,
} from '~web/shared/tests/utils'
import { createCoreRadioButtonGroupProps } from '~core/ui/radioButtonGroup/models/types'
import '~core/ui/radioButtonGroup'
import '~core/ui/radioButton'
import {
  propSizeTestCases,
  propValueTestCases,
  propLabelTextTestCases,
  propLabelTooltipTextTestCases,
  propDirectionTestCases,
} from './cases/props'
import type { /* AltCoreRadioButton, */ AltCoreLabel } from '~core/index'
import { userEvent } from 'vitest/browser'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreRadioButtonGroupProps(),
)

const getRadioInLightDOM = () => {
  return component.querySelectorAll(AltCoreRadioButtonTagName)
}

const getRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}


const getLocalShadowElement = (selector: string) => {
  return getShadowElement(
    component,
    selector,
  )
}

const getLabelElement = () => getLocalShadowElement(AltCoreLabelTagName) as AltCoreLabel | undefined

const radioButtonsSlot = [
  `<${AltCoreRadioButtonTagName} value="1" label-text="Radio 1"></${AltCoreRadioButtonTagName}>`,
  `<${AltCoreRadioButtonTagName} value="2" label-text="Radio 2"></${AltCoreRadioButtonTagName}>`,
  `<${AltCoreRadioButtonTagName} value="3" label-text="Radio 3"></${AltCoreRadioButtonTagName}>`,
].join('\n')

describe('Core/AltCoreRadioButtonGroup/Unit', () => {
  beforeAll(() => {
    injectComponentToBody()
  })

  afterEach(async() => {
    await resetComponent()
  })

  afterAll(() => {
    removeComponent()
  })

  describe('Props', () => {
    for (const testCase of propSizeTestCases) {
      it(
        `Prop "${testCase.prop}" with value "${testCase.value}" should set the RadioButton prop to "${String(testCase.expected)}"`,
        async() => {
          component.innerHTML = radioButtonsSlot
          await component.updateComplete
          await updateComponent({ props: { [testCase.prop]: testCase.value } })

          const radioButtons = getRadioInLightDOM()

          radioButtons.forEach((radio) => {
            expect(radio).toHaveProperty(testCase.prop, testCase.value)
          })
        },
      )
    }

    for (const testCase of propValueTestCases) {
      it(
        `Prop "${testCase.prop}" with value "${testCase.value}" should set checked=true only on the RadioButton with value="${testCase.value}"`,
        async() => {
          component.innerHTML = radioButtonsSlot
          await component.updateComplete
          await updateComponent({ props: { [testCase.prop]: testCase.value } })

          const radioButtons = getRadioInLightDOM()

          radioButtons.forEach((radio) => {
            if (radio.value === testCase.value) {
              expect(radio.checked).toBe(true)
            } else {
              expect(radio.checked).toBe(false)
            }
          })
        },
      )
    }

    for (const testCase of propLabelTooltipTextTestCases) {
      it(
        `Prop "${testCase.prop}" with value "${testCase.value}" should set the Label prop to "${testCase.value}"`,
        async() => {
          await updateComponent({ props: { labelText: text, [testCase.prop]: testCase.value } })

          const Label = getLabelElement()

          expect(Label?.tooltipText).toBe(testCase.expected)
        },
      )
    }

    for (const testCase of propLabelTextTestCases) {
      it(
        `Prop "${testCase.prop}" with value "${testCase.value}" should set the Label prop to "${testCase.value}"`,
        async() => {
          await updateComponent({ props: { [testCase.prop]: testCase.value } })

          const Label = getLabelElement()

          expect(Label?.text).toBe(testCase.expected)
        },
      )
    }
    for (const testCase of propDirectionTestCases) {
      const expectedCssClass = `${tagName}__wrapper_direction_${testCase.value}`

      it(
        `Should ${testCase.case} add class ${expectedCssClass} when prop ${testCase.prop} is ${testCase.value}`,
        async() => {
          await updateComponent({ props: { [testCase.prop]: testCase.value } })

          const rootElement = getRootElement()
          const wrapperElement = rootElement?.querySelector(`.${tagName}__wrapper`)
          const wrapperElementClasses = getElementClasses(wrapperElement)

          expect(wrapperElementClasses).toContain(expectedCssClass)
        },
      )
    }
  })

  describe('Events', () => {
    it('Should emit change when a radio is selected', async() => {
      component.innerHTML = radioButtonsSlot
      await component.updateComplete

      const radios = getRadioInLightDOM()
      const radioBtn = radios[1]

      const handleChange = vi.fn()

      component.addEventListener('change', handleChange)

      const radioDiv = radioBtn.shadowRoot?.querySelector('div')

      if (!radioDiv) {
        throw new Error('Radio button div not found')
      }

      await userEvent.click(radioDiv)

      expect(handleChange).toHaveBeenCalledTimes(1)
    })
  })
})
