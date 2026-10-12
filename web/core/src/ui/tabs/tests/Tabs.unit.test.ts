import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import {
  YCoreTabsTagName as tagName,
  YCoreTabTagName,
} from '~web/shared/constants'
import { useCoreTests } from '~shared/tests/core.ts'
import {
  propsTabsTestCases,
  propsValueTestCases,
} from '~core/ui/tabs/tests/cases/props.ts'
import { slotDefaultTestCases } from '~core/ui/tabs/tests/cases/slots.ts'
import { createCoreTabsProps } from '~core/ui/tabs/models/types'
import '~core/ui/tabs'
import '~core/ui/tab'
import { eventChangeActiveTab } from '~core/ui/tabs/tests/cases/events.ts'
import { createCoreTabProps } from '../../tab/models/types'
import { getElementClasses, getShadowElement } from '~shared/tests/utils.ts'

const tabs = [createCoreTabProps()]

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreTabsProps(),
)

const getLocalShadowElement = (selector: string) => {
  return getShadowElement(
    component,
    selector,
  )
}

const baseSlotsCheck = () => {
  for (const testCase of slotDefaultTestCases) {
    it(
      `Slot "${testCase.slot}" должен быть ${testCase.case}`,
      async() => {
        await updateComponent({ slots: { [testCase.slot]: testCase.content } })

        expect(component.textContent).toBe(testCase.content)
      },
    )
  }
}

const basePropsCheck = () => {
  for (const testCase of [
    ...propsTabsTestCases,
    ...propsValueTestCases,
  ]) {
    it(
      `Prop "${testCase.prop}" должен быть ${typeof testCase.value === 'object' ? JSON.stringify(testCase.value) : testCase.value}`,
      async() => {
        await updateComponent({ props: { [testCase.prop]: testCase.value } })

        expect(component[testCase.prop]).toEqual(testCase.value)
      },
    )
  }
}

describe(
  'Core/YCoreTabs/Unit',
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
      'Slots',
      () => {
        baseSlotsCheck()
      },
    )

    describe(
      'Props',
      () => {
        basePropsCheck()
      },
    )

    describe('Events', () => {
      for (const testCase of [...eventChangeActiveTab]) {
        it(
          `Должен генерировать событие ${testCase.event} ${testCase.case}`,
          () => {
            const eventHandler = vi.fn()
            component.addEventListener(
              testCase.nodeEventName,
              eventHandler,
            )

            component.dispatchEvent(new Event(testCase.nodeEventName))

            expect(eventHandler).toHaveBeenCalledTimes(1)
          },
        )
      }

      it('Проверка клика на Tab', async() => {
        await updateComponent({ props: { tabs } })

        const tabRootElement = getLocalShadowElement(YCoreTabTagName)

        if (!tabRootElement) {
          throw new Error('TabRootElement не найден')
        }

        const handleTabClick = vi.fn()

        component.addEventListener(
          'change-active-tab',
          handleTabClick,
        )

        tabRootElement.dispatchEvent(new CustomEvent('click'))

        expect(handleTabClick).toHaveBeenCalledTimes(1)

        const tabElement = tabRootElement.shadowRoot

        if (!tabElement) {
          throw new Error('TabShadow не найден')
        }

        const activatorElement = tabElement.firstElementChild?.querySelector('.y-core-tab__activator')

        if (!activatorElement) {
          throw new Error('ActivatorElement не найден')
        }

        const activatorClasses = getElementClasses(activatorElement)
        expect(activatorClasses).toContain('y-core-tab__activator_active')
      })
    })
  },
)
