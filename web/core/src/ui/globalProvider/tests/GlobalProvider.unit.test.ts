import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'

import { text, empty } from '~shared/tests/slotContents'
import type { TSlotTestCase } from '~shared/types/tests'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot } from '~shared/tests/utils'
import { YCoreGlobalProviderTagName } from '~shared/constants'
import { GlobalContext } from '~core/ui/globalProvider/context'
import '~core/ui/globalProvider'

const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'default', case: 'with content', content: text },
  { slot: 'default', case: 'without content', content: empty },
]

const tagName = YCoreGlobalProviderTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(tagName)

describe(
  'Core/YCoreGlobalProvider/Unit',
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
        for (const testCase of slotDefaultTestCases) {
          it(
            `Slot "${testCase.slot}" should render ${testCase.case}`,
            async() => {
              await updateComponent({ slots: { [testCase.slot]: testCase.content } })

              const rootElement = getWCShadowRoot(component).querySelector('div')
              const textContent = rootElement?.querySelector('slot')?.assignedNodes()[0]?.textContent
              expect(textContent).toBe(testCase.content)
            },
          )
        }
      },
    )

    describe(
      'Events',
      () => {
        it(
          'should emit ready when connected',
          () => {
            const readyHandler = vi.fn()

            component.addEventListener(
              'ready',
              readyHandler,
            )

            component.connectedCallback()
            component.firstUpdated()

            expect(readyHandler).toHaveBeenCalledTimes(1)
            expect((readyHandler.mock.calls[0]?.[0] as CustomEvent<{ value: GlobalContext }>).detail.value).toBeInstanceOf(GlobalContext)
          },
        )
      },
    )

    describe(
      'Providers',
      () => {
        it(
          'should create a GlobalContext instance',
          () => {
            expect(component.globalContext).toBeInstanceOf(GlobalContext)
          },
        )
      },
    )
  },
)
