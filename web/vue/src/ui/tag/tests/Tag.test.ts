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
            `Prop: "${testCase.prop}" ${typeof testCase.value === 'object' ? JSON.stringify(testCase.value) : testCase.value} ${testCase.value === undefined ? 'не' : ''} должен изменить свойство ${testCase.prop} у core компонента`,
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
          'Должен корректно передать size в Web Component',
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
          'Должен корректно обработать undefined size в Web Component',
          () => {
            const wrapper = mount(
              YTag,
              { props: { size: undefined } },
            )
            const coreElement = wrapper.find(tagName)

            // По умолчанию должен быть medium
            expect(coreElement.element.size).toBe(EYSizes.MEDIUM)
          },
        )

        it(
          'Должен корректно передать variant в Web Component',
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
          'Должен корректно обработать undefined variant в Web Component',
          () => {
            const wrapper = mount(
              YTag,
              { props: { variant: undefined } },
            )
            const coreElement = wrapper.find(tagName)

            // По умолчанию должен быть accent
            expect(coreElement.element.variant).toBe(EYCoreTagVariant.ACCENT)
          },
        )

        it(
          'Должен корректно передать disabled в Web Component',
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
          'Должен корректно обработать undefined disabled в Web Component',
          () => {
            const wrapper = mount(
              YTag,
              { props: { disabled: undefined } },
            )
            const coreElement = wrapper.find(tagName)

            // По умолчанию должен быть false
            expect(coreElement.element.disabled).toBe(false)
          },
        )

        it(
          'Должен корректно передать iconLeft в Web Component',
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
          'Должен корректно обработать undefined iconLeft в Web Component',
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
      'Слоты',
      () => {
        it(
          'Должен корректно передать содержимое слота по умолчанию',
          () => {
            const slotContent = 'Тестовый тег'
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
