/* eslint-disable vue/one-component-per-file -- test fixtures */
import { defineComponent, h, nextTick, onMounted, ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreTabPanelsTagName as tagName, AltCoreTabPanelTagName } from '~shared/constants'
import { AltTabPanels } from '~vue/ui/tabPanels'
import { AltTabPanel } from '~vue/ui/tabPanel'
import type { AltCoreTabPanel } from '~core/ui/tabPanel'

const mountPanels = (keepAlive: boolean, onPanelMounted = vi.fn()) => {
  const Content = defineComponent({
    props: { label: { type: String, required: true } },
    setup(props) {
      onMounted(() => {
        onPanelMounted(props.label)
      })

      return () => h('span', props.label)
    },
  })

  const value = ref<string>('first')

  const wrapper = mount(defineComponent({
    setup: () => () => h(
      AltTabPanels,
      { modelValue: value.value, keepAlive },
      {
        default: () => [
          h(AltTabPanel, { name: 'first', label: 'First' }, { default: () => h(Content, { label: 'first' }) }),
          h(AltTabPanel, { name: 'second', labelledby: 'second-tab' }, { default: () => h(Content, { label: 'second' }) }),
        ],
      },
    ),
  }))

  return { wrapper, value, onPanelMounted }
}

describe(
  'Vue/AltTabPanels',
  () => {
    it(
      'Should pass the model value to the core component',
      () => {
        const { wrapper } = mountPanels(false)

        expect((wrapper.find(tagName).element as HTMLElement & { value?: string }).value).toBe('first')
      },
    )

    it(
      'Should pass the panel props to the core panels',
      () => {
        const { wrapper } = mountPanels(false)
        const [first, second] = wrapper.findAll(AltCoreTabPanelTagName).map((panel) => panel.element as unknown as AltCoreTabPanel)

        expect(first.name).toBe('first')
        expect(first.label).toBe('First')
        expect(second.labelledby).toBe('second-tab')
      },
    )

    it(
      'Should render only the active panel content without keep-alive',
      async() => {
        const { wrapper, value } = mountPanels(false)

        expect(wrapper.text()).toBe('first')

        value.value = 'second'
        await nextTick()

        expect(wrapper.text()).toBe('second')
      },
    )

    it(
      'Should keep the content of shown panels with keep-alive',
      async() => {
        const { wrapper, value, onPanelMounted } = mountPanels(true)

        value.value = 'second'
        await nextTick()
        value.value = 'first'
        await nextTick()

        expect(wrapper.text()).toBe('firstsecond')
        expect(onPanelMounted.mock.calls).toStrictEqual([['first'], ['second']])
      },
    )

    it(
      'AltTabPanel should render its content without AltTabPanels',
      () => {
        const wrapper = mount(AltTabPanel, { props: { name: 'standalone' }, slots: { default: 'Content' } })

        expect(wrapper.text()).toBe('Content')
      },
    )
  },
)
