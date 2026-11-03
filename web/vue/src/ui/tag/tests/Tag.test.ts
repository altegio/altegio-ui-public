import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { AltCoreTagTagName } from '~shared/constants'
import { AltCoreTag } from '~core/ui/tag'
import { EAltCoreTagVariant } from '~core/ui/tag/models/types/external'
import { EAltSizes } from '~shared/types/global'
import type { IAltIcon } from '~shared/icons'

import { AltTag } from '~vue/ui/tag'
import { propLocatorTestCases } from '~vue/ui/tag/tests/cases/css.ts'

const tagName = AltCoreTagTagName

describe(
  'Vue/AltTag',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreTag,
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
                AltTag,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as AltCoreTag

              expect(coreElement[testCase.prop]).toEqual(testCase.expected)
            },
          )
        }
        it(
          'Should pass size to the web component',
          () => {
            const size = EAltSizes.SMALL
            const wrapper = mount(
              AltTag,
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
              AltTag,
              { props: { size: undefined } },
            )
            const coreElement = wrapper.find(tagName)

            // Defaults to medium
            expect(coreElement.element.size).toBe(EAltSizes.MEDIUM)
          },
        )

        it(
          'Should pass variant to the web component',
          () => {
            const variant = EAltCoreTagVariant.DANGER
            const wrapper = mount(
              AltTag,
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
              AltTag,
              { props: { variant: undefined } },
            )
            const coreElement = wrapper.find(tagName)

            // Defaults to accent
            expect(coreElement.element.variant).toBe(EAltCoreTagVariant.ACCENT)
          },
        )

        it(
          'Should pass disabled to the web component',
          () => {
            const disabled = true
            const wrapper = mount(
              AltTag,
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
              AltTag,
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
            const iconLeft: IAltIcon = { name: 'check', data: '' }
            const wrapper = mount(
              AltTag,
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
              AltTag,
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
              AltTag,
              { slots: { default: slotContent } },
            )

            expect(wrapper.text()).toContain(slotContent)
          },
        )
      },
    )
  },
)
