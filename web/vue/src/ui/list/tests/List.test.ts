import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreListTagName as tagName } from '~shared/constants'
import { AltList } from '~vue/ui/list'

describe(
  'Vue/AltList',
  () => {
    it(
      'Prop "separator" should be set on the core component',
      () => {
        const wrapper = mount(AltList, { props: { separator: true } })

        expect((wrapper.find(tagName).element as HTMLElement & { separator?: boolean }).separator).toBe(true)
      },
    )

    it(
      'The default slot should render into the core component',
      () => {
        const wrapper = mount(AltList, { slots: { default: '<span>Item</span>' } })

        expect(wrapper.find(tagName).text()).toBe('Item')
      },
    )
  },
)
