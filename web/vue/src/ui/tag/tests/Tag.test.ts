import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { YCoreTagTagName } from '~shared/constants'
import { YCoreTag } from '~core/ui/tag'
import { EYCoreTagVariant } from '~core/ui/tag/models/types/external'
import { EYSizes } from '~shared/types/global'
import type { IYIcon } from '~shared/icons'

import { YTag } from '~vue/ui/tag'
import { propLocatorTestCases } from '~vue/ui/tag/tests/cases/css.ts'

const tagName = YCoreTagTagName

describe(
  'Vue/YTag',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreTag,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of propLocatorTestCases) {
          it(
            `Prop: "${testCase.prop}" ${typeof testCase.value === 'object' ? JSON.stringify(testCase.value) : testCase.value} should ${testCase.value === undefined ? 'not' : ''} set ${testCase.prop} on the core component`,
            () => {
              const wrapper = mount(
                YTag,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as YCoreTag

              expect(coreElement[testCase.prop]).toEqual(testCase.expected)
            },
          )
        }
        it(
          'Should pass size to the web component',
          () => {
            const size = EYSizes.SMALL
            const wrapper = mount(
              YTag,
              { props: { size } },
            )
            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.size).toBe(size)
          },
        )

        it(
          'Should handle undefined size in the web component',
          () => {
            const wrapper = mount(
              YTag,
              { props: { size: undefined } },
            )
            const coreElement = wrapper.find(tagName)

            // Defaults to medium
            expect(coreElement.element.size).toBe(EYSizes.MEDIUM)
          },
        )

        it(
          'Should pass variant to the web component',
          () => {
            const variant = EYCoreTagVariant.DANGER
            const wrapper = mount(
              YTag,
              { props: { variant } },
            )
            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.variant).toBe(variant)
          },
        )

        it(
          'Should handle undefined variant in the web component',
          () => {
            const wrapper = mount(
              YTag,
              { props: { variant: undefined } },
            )
            const coreElement = wrapper.find(tagName)

            // Defaults to accent
            expect(coreElement.element.variant).toBe(EYCoreTagVariant.ACCENT)
          },
        )

        it(
          'Should pass disabled to the web component',
          () => {
            const disabled = true
            const wrapper = mount(
              YTag,
              { props: { disabled } },
            )
            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.disabled).toBe(disabled)
          },
        )

        it(
          'Should handle undefined disabled in the web component',
          () => {
            const wrapper = mount(
              YTag,
              { props: { disabled: undefined } },
            )
            const coreElement = wrapper.find(tagName)

            // Defaults to false
            expect(coreElement.element.disabled).toBe(false)
          },
        )

        it(
          'Should pass iconLeft to the web component',
          () => {
            const iconLeft: IYIcon = { name: 'check', data: '' }
            const wrapper = mount(
              YTag,
              { props: { iconLeft } },
            )
            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.iconLeft).toEqual(iconLeft)
          },
        )

        it(
          'Should handle undefined iconLeft in the web component',
          () => {
            const wrapper = mount(
              YTag,
              { props: { iconLeft: undefined } },
            )
            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.iconLeft).toBeUndefined()
          },
        )
      },
    )

    describe(
      'Slots',
      () => {
        it(
          'Should pass the default slot content',
          () => {
            const slotContent = 'Test tag'
            const wrapper = mount(
              YTag,
              { slots: { default: slotContent } },
            )

            expect(wrapper.text()).toContain(slotContent)
          },
        )
      },
    )
  },
)
