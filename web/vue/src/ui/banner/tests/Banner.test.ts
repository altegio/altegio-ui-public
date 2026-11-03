import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreBannerTagName as tagName } from '~shared/constants'
import { AltBanner } from '~vue/ui/banner'
import type { IAltVueBannerProps } from '~vue/ui/banner/models/types'
import { EAltCoreBannerLayout, EAltCoreBannerVariant } from '~core/ui/banner/models/types'
import { altRocket } from '~shared/icons'
import type { TPropTestCase } from '~shared/types/tests'

const propTestCases: TPropTestCase<Required<IAltVueBannerProps>, keyof IAltVueBannerProps>[] = [
  { prop: 'variant', case: 'danger', value: EAltCoreBannerVariant.DANGER },
  { prop: 'layout', case: 'page', value: EAltCoreBannerLayout.PAGE },
  { prop: 'title', case: 'with text', value: 'Title' },
  { prop: 'description', case: 'with text', value: 'Description' },
  { prop: 'icon', case: 'with an icon', value: altRocket },
  { prop: 'hideIcon', case: 'true', value: true },
  { prop: 'closable', case: 'true', value: true },
  { prop: 'closeLabel', case: 'with text', value: 'Dismiss' },
]

describe(
  'Vue/AltBanner',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of propTestCases) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should be set on the core component`,
            () => {
              const wrapper = mount(AltBanner, { props: { [testCase.prop]: testCase.value } })

              const coreElement = wrapper.find(tagName).element as HTMLElement & IAltVueBannerProps

              expect(coreElement[testCase.prop]).toStrictEqual(testCase.value)
            },
          )
        }
      },
    )

    describe(
      'Slots',
      () => {
        it(
          'The default slot should render into the core component',
          () => {
            const wrapper = mount(AltBanner, { slots: { default: 'Message' } })

            expect(wrapper.find(tagName).text()).toBe('Message')
          },
        )

        it(
          'The "actions" slot should render into the core "actions" slot',
          () => {
            const wrapper = mount(AltBanner, { slots: { actions: '<button>Action</button>' } })

            expect(wrapper.find(`${tagName} [slot="actions"]`).text()).toBe('Action')
          },
        )

        it(
          'The "actions" slot wrapper should not render without content',
          () => {
            const wrapper = mount(AltBanner)

            expect(wrapper.find(`${tagName} [slot="actions"]`).exists()).toBe(false)
          },
        )
      },
    )

    describe(
      'Events',
      () => {
        it(
          'Should emit "close" once when the core component emits it',
          async() => {
            const parentListener = vi.fn()
            const wrapper = mount(AltBanner, { props: { closable: true }, attachTo: document.body })
            document.body.addEventListener('close', parentListener)

            const coreElement = wrapper.find(tagName).element as HTMLElement
            await customElements.whenDefined(tagName)
            coreElement.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }))

            document.body.removeEventListener('close', parentListener)

            expect(wrapper.emitted('close')).toHaveLength(1)
            expect(parentListener).not.toHaveBeenCalled()

            wrapper.unmount()
          },
        )
      },
    )
  },
)
