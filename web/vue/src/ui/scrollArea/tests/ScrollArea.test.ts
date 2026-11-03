import { afterEach, describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { AltCoreScrollAreaTagName as tagName } from '~shared/constants'
import { AltScrollArea } from '~vue/ui/scrollArea'
import type { IAltVueScrollAreaProps } from '~vue/ui/scrollArea/models/types'
import type { AltCoreScrollArea } from '~core/ui/scrollArea'
import type { TPropTestCase } from '~shared/types/tests'

const propTestCases: TPropTestCase<Required<IAltVueScrollAreaProps>, keyof IAltVueScrollAreaProps>[] = [
  { prop: 'orientation', case: 'both', value: 'both' },
  { prop: 'accessibleName', case: 'with text', value: 'Terms' },
]

let wrapper: VueWrapper | undefined

const mountScrollArea = (props: IAltVueScrollAreaProps = {}) => {
  wrapper = mount(AltScrollArea, {
    props,
    attrs: { style: 'height: 100px;' },
    slots: { default: () => h('div', { style: 'height: 1000px;' }, 'Content') },
    attachTo: document.body,
  })

  return wrapper
}

afterEach(() => {
  wrapper?.unmount()
})

describe(
  'Vue/AltScrollArea',
  () => {
    for (const testCase of propTestCases) {
      it(
        `Prop "${testCase.prop}" (${testCase.case}) should be set on the core component`,
        () => {
          const coreElement = mountScrollArea({ [testCase.prop]: testCase.value }).find(tagName).element as AltCoreScrollArea

          expect(coreElement[testCase.prop]).toBe(testCase.value)
        },
      )
    }

    it(
      'Should render the default slot and pass attributes to the core component',
      () => {
        const coreElement = mountScrollArea().find(tagName).element as HTMLElement

        expect(coreElement.textContent).toBe('Content')
        expect(coreElement.style.height).toBe('100px')
      },
    )

    it(
      'Should expose the scroll methods and re-emit "scroll-change"',
      async() => {
        const scrollArea = mountScrollArea()
        const coreElement = scrollArea.find(tagName).element as AltCoreScrollArea
        await coreElement.updateComplete

        const exposed = scrollArea.vm as unknown as Pick<AltCoreScrollArea, 'getScrollPosition' | 'setScrollPosition' | 'setScrollPercentage'>
        exposed.setScrollPosition('vertical', 450)

        await vi.waitFor(() => { expect(scrollArea.emitted('scroll-change')).toBeTruthy() })
        expect(exposed.getScrollPosition()).toMatchObject({ top: 450, topRatio: 0.5 })

        exposed.setScrollPercentage('vertical', 1)
        await vi.waitFor(() => { expect(exposed.getScrollPosition().topRatio).toBe(1) })
      },
    )
  },
)
