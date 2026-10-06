import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { userEvent } from '@storybook/test'
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
import { getWCShadowRoot } from '~shared/tests/utils'
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
            `Prop "${testCase.prop}" со значением ${JSON.stringify(testCase.value)} должен корректно поменять prop в класс в ${YCoreTipTagName}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const dropdownElement = getWCShadowRoot(component).querySelector(YCoreTipTagName)

              expect(dropdownElement?.[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        it(
          `Prop ${propSubmitTextTestCases.case} со значением ${propSubmitTextTestCases.value} должно поменять prop в класс в YCoreSimpleButtonTagName`,
          async() => {
            await updateComponent({ props: { [propSubmitTextTestCases.prop]: propSubmitTextTestCases.value } })
            const buttonElement = getWCShadowRoot(component).querySelectorAll(`${YCoreSimpleButtonTagName}[variant="primary"]`)

            expect(buttonElement[0].textContent?.trim()).toBe(propSubmitTextTestCases.value)
          },
        )

        it(
          `Prop ${propCancelTextTestCases.case} со значением ${propCancelTextTestCases.value} должно поменять prop в класс в YCoreSimpleButtonTagName`,
          async() => {
            await updateComponent({ props: { [propCancelTextTestCases.prop]: propCancelTextTestCases.value } })
            const buttonElement = getWCShadowRoot(component).querySelectorAll(`${YCoreSimpleButtonTagName}[variant="text"]`)

            expect(buttonElement[0].textContent?.trim()).toBe(propCancelTextTestCases.value)
          },
        )
      },
    )

    describe(
      'Events',
      () => {
        // TODO: Добавить тесты для событий
        it(
          'Должен вызывать событие "submit" при нажатии на кнопку подтверждения',
          async() => {
            await updateComponent({ props: { submitText: 'submit' } })

            const submitHandler = vi.fn()
            component.addEventListener(
              'submit',
              submitHandler,
            )

            const buttonElement = getWCShadowRoot(component).querySelector(`${YCoreSimpleButtonTagName}[variant="primary"]`)
            if (!buttonElement) {
              throw Error('Button submit не найден')
            }

            await userEvent.click(buttonElement)

            expect(submitHandler).toHaveBeenCalled()
          },
        )

        it(
          'Должен вызывать событие "close" при нажатии на кнопку отмены',
          async() => {
            await updateComponent({ props: { cancelText: 'cancel' } })

            const closeHandler = vi.fn()
            component.addEventListener(
              'cancel',
              closeHandler,
            )

            const buttonElement = getWCShadowRoot(component).querySelector(`${YCoreSimpleButtonTagName}[variant="text"]`)
            if (!buttonElement) {
              throw Error('Button close не найден')
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
            `Slot "${testCase.slot}" должен быть ${testCase.case}`,
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
