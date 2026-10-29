import { describe, expect, it, beforeAll } from 'vitest'
import { type Ref, type VNode, inject, h } from 'vue'
import { mount } from '@vue/test-utils'
import { YGlobalProvider } from '~vue/ui/globalProvider'
import { GlobalProviderReadyEvent } from '~core/ui/globalProvider/models/types'
import {
  type IYVueGlobalProviderEmits,
} from '~vue/ui/globalProvider/models/types'
import { text, empty } from '~shared/tests/slotContents'
import type { TSlotTestCase } from '~shared/types/tests'
import { YCoreGlobalProviderTagName as tagName } from '~shared/constants'
import { YCoreGlobalProvider } from '~core/ui/globalProvider'
import type { IGlobalContext } from '~core/ui/globalProvider/context'

interface ICreateComponentArgs {
  slots: {
    default: string | VNode
  }
}

const createComponent = ({ slots }: ICreateComponentArgs) => {
  return mount(
    YGlobalProvider,
    { slots },
  )
}

// Unit test cases:
const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'default', case: 'with content', content: text },
  { slot: 'default', case: 'without content', content: empty },
]

const TestConsumer = {
  template: '<div>TestConsumer</div>',
  setup() {
    const globalContext = inject<Ref<IGlobalContext>>('globalContext')
    if (!globalContext) throw new Error('Global context not found')
    return { globalContext }
  },
}

describe(
  'Vue/YGlobalProvider',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreGlobalProvider,
        )
      }
    })

    describe(
      'Slots',
      () => {
        for (const testCase of slotDefaultTestCases) {
          it(
            `Slot "${testCase.slot}" should render ${testCase.case}`,
            () => {
              const wrapper = createComponent({ slots: { default: testCase.content } })

              expect(wrapper.text()).toBe(testCase.content)
            },
          )
        }
      },
    )

    describe(
      'Providers',
      () => {
        it(
          'Should create the global context',
          () => {
            const wrapper = createComponent({ slots: { default: h(TestConsumer) } })

            const coreElement = wrapper.find(tagName).element
            coreElement.connectedCallback()
            coreElement.firstUpdated()

            const testConsumer = wrapper.findComponent(TestConsumer)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const globalContext = testConsumer.vm.globalContext

            expect(globalContext).toBeDefined()
          },
        )
      },
    )

    describe(
      'Events',
      () => {
        it(
          'Should handle the ready event',
          () => {
            const wrapper = createComponent({ slots: { default: '' } })

            const coreElement = wrapper.find(tagName).element
            coreElement.connectedCallback()
            coreElement.firstUpdated()
            const emitted = wrapper.emitted<IYVueGlobalProviderEmits>()
            const readyEvents = emitted.ready as unknown as GlobalProviderReadyEvent[][]
            expect(emitted).toHaveProperty('ready')
            expect(readyEvents[0][0]).toBeInstanceOf(GlobalProviderReadyEvent)
          },
        )
      },
    )
  },
)
