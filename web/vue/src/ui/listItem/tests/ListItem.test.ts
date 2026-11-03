import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreListItemTagName as tagName } from '~shared/constants'
import { AltListItem } from '~vue/ui/listItem'
import type { IAltVueListItemProps } from '~vue/ui/listItem/models/types'
import { EAltCoreListItemAlign } from '~core/ui/listItem/models/types'
import type { TPropTestCase } from '~shared/types/tests'

const propTestCases: TPropTestCase<Required<IAltVueListItemProps>, keyof IAltVueListItemProps>[] = [
  { prop: 'label', case: 'with text', value: 'Label' },
  { prop: 'caption', case: 'with text', value: 'Caption' },
  { prop: 'clickable', case: 'true', value: true },
  { prop: 'href', case: 'with a URL', value: '#target' },
  { prop: 'target', case: '_blank', value: '_blank' },
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'active', case: 'true', value: true },
  { prop: 'align', case: 'start', value: EAltCoreListItemAlign.START },
]

describe(
  'Vue/AltListItem',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of propTestCases) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should be set on the core component`,
            () => {
              const wrapper = mount(AltListItem, { props: { [testCase.prop]: testCase.value } })

              const coreElement = wrapper.find(tagName).element as HTMLElement & IAltVueListItemProps

              expect(coreElement[testCase.prop]).toBe(testCase.value)
            },
          )
        }
      },
    )

    describe(
      'Slots',
      () => {
        for (const slot of ['start', 'caption', 'end']) {
          it(
            `The "${slot}" slot should render into the core "${slot}" slot`,
            () => {
              const wrapper = mount(AltListItem, { slots: { [slot]: 'Content' } })

              expect(wrapper.find(`${tagName} [slot="${slot}"]`).text()).toBe('Content')
            },
          )

          it(
            `The "${slot}" slot wrapper should not render without content`,
            () => {
              const wrapper = mount(AltListItem)

              expect(wrapper.find(`${tagName} [slot="${slot}"]`).exists()).toBe(false)
            },
          )
        }

        it(
          'The default slot should render into the core component',
          () => {
            const wrapper = mount(AltListItem, { slots: { default: 'Label' } })

            expect(wrapper.find(tagName).text()).toBe('Label')
          },
        )
      },
    )

    describe(
      'Events',
      () => {
        it(
          'The native click should reach the @click listener',
          async() => {
            const onClick = vi.fn()
            const wrapper = mount(AltListItem, { props: { clickable: true }, attrs: { onClick }, attachTo: document.body })
            await customElements.whenDefined(tagName)
            const coreElement = wrapper.find(tagName).element as HTMLElement

            coreElement.click()

            expect(onClick).toHaveBeenCalledTimes(1)

            wrapper.unmount()
          },
        )

        it(
          'The native click should not reach the @click listener while disabled',
          async() => {
            const onClick = vi.fn()
            const wrapper = mount(AltListItem, { props: { clickable: true, disabled: true }, attrs: { onClick }, attachTo: document.body })
            await customElements.whenDefined(tagName)
            const coreElement = wrapper.find(tagName).element as HTMLElement

            coreElement.click()

            expect(onClick).not.toHaveBeenCalled()

            wrapper.unmount()
          },
        )
      },
    )
  },
)
