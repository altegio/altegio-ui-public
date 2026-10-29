import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'storybook/test'
import {
  YCorePopoverTagName,
  YCoreTipTagName,
  YCoreSimpleButtonTagName,
} from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  createCorePopoverProps,
} from '~core/ui/popover/models/types'
import '~core/ui/popover'
import { getWCShadowRoot, trimTextContent } from '~shared/tests/utils'
import {
  slotActivatorTestCases,
  slotContentTestCases,
} from './cases/slots'
import {
  propIsOpenTestCases,
  propOffsetTestCases,
  propPaddingTestCases,
  propPlacementTestCases,
  propStrategyTestCases,
  propTransitionTestCases,
  propTriggerTestCases,
  propSubmitTextTestCases,
  propCancelTextTestCases,
} from './cases/props'

const tagName = YCorePopoverTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCorePopoverProps(),
)

describe(
  'Core/YPopover/Unit',
  () => {
    beforeAll(() => {
      injectComponentToBody()
    })

    afterEach(async() => {
      await resetComponent()
    })

    afterAll(() => {
      removeComponent()
    })

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propIsOpenTestCases,
          ...propOffsetTestCases,
          ...propPaddingTestCases,
          ...propPlacementTestCases,
          ...propStrategyTestCases,
          ...propTransitionTestCases,
          ...propTriggerTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" with value ${JSON.stringify(testCase.value)} should map the prop to a class in ${YCoreTipTagName}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const dropdownElement = getWCShadowRoot(component).querySelector(YCoreTipTagName)

              expect(dropdownElement?.[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        it(
          `Prop ${propSubmitTextTestCases.case} with value ${propSubmitTextTestCases.value} should map the prop to a class in YCoreSimpleButtonTagName`,
          async() => {
            await updateComponent({ props: { [propSubmitTextTestCases.prop]: propSubmitTextTestCases.value } })
            const buttonElement = getWCShadowRoot(component).querySelectorAll(`${YCoreSimpleButtonTagName}[variant="primary"]`)

            expect(trimTextContent(buttonElement[0].textContent)).toBe(propSubmitTextTestCases.value)
          },
        )

        it(
          `Prop ${propCancelTextTestCases.case} with value ${propCancelTextTestCases.value} should map the prop to a class in YCoreSimpleButtonTagName`,
          async() => {
            await updateComponent({ props: { [propCancelTextTestCases.prop]: propCancelTextTestCases.value } })
            const buttonElement = getWCShadowRoot(component).querySelectorAll(`${YCoreSimpleButtonTagName}[variant="text"]`)

            expect(trimTextContent(buttonElement[0].textContent)).toBe(propCancelTextTestCases.value)
          },
        )
      },
    )

    describe(
      'Events',
      () => {
        // TODO: Add event tests
        it(
          'Should emit "submit" when the confirm button is pressed',
          async() => {
            await updateComponent({ props: { submitText: 'submit' } })

            const submitHandler = vi.fn()
            component.addEventListener(
              'submit',
              submitHandler,
            )

            const buttonElement = getWCShadowRoot(component).querySelector(`${YCoreSimpleButtonTagName}[variant="primary"]`)
            if (!buttonElement) {
              throw Error('Submit button not found')
            }

            await userEvent.click(buttonElement)

            expect(submitHandler).toHaveBeenCalled()
          },
        )

        it(
          'Should emit "close" when the cancel button is pressed',
          async() => {
            await updateComponent({ props: { cancelText: 'cancel' } })

            const closeHandler = vi.fn()
            component.addEventListener(
              'cancel',
              closeHandler,
            )

            const buttonElement = getWCShadowRoot(component).querySelector(`${YCoreSimpleButtonTagName}[variant="text"]`)
            if (!buttonElement) {
              throw Error('Close button not found')
            }

            await userEvent.click(buttonElement)

            expect(closeHandler).toHaveBeenCalled()
          },
        )
      },
    )

    describe(
      'Slots',
      () => {
        for (const testCase of [
          ...slotActivatorTestCases,
          ...slotContentTestCases,
        ]) {
          it(
            `Slot "${testCase.slot}" should render ${testCase.case}`,
            async() => {
              await updateComponent({ slots: { [testCase.slot]: testCase.content } })

              expect(component.textContent).toBe(testCase.content)
            },
          )
        }
      },
    )
  },
)
