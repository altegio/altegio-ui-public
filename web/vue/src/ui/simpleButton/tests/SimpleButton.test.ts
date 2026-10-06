import { beforeAll, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { textWithTag } from '~shared/tests/slotContents'
import { href } from '~shared/tests/mockData'
import { EAnchorTarget, EYSizes } from '~shared/types/global'
import { createCoreSimpleButtonProps, EYCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'

import { YCoreSimpleButtonTagName } from '~shared/constants'

import { YCoreSimpleButton } from '~core/ui/simpleButton'
import { YSimpleButton } from '~vue/ui/simpleButton'

const {
  size: defaultSize,
  variant: defaultVariant,
} = createCoreSimpleButtonProps()

const tagName = YCoreSimpleButtonTagName

describe(
  'Vue/YSimpleButton',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreSimpleButton,
        )
      }
    })

    describe(
      'props',
      () => {
        it(
          'Изменения prop size должно изменять CoreButton',
          () => {
            const size = EYSizes.MEDIUM

            const wrapper = mount(
              YSimpleButton,
              { props: { size } },
            )

            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.size).toBe(size)
          },
        )

        it(
          'Изменения prop variant должно изменять CoreButton',
          () => {
            const variant = EYCoreSimpleButtonVariant.OUTLINE

            const wrapper = mount(
              YSimpleButton,
              { props: { variant } },
            )

            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.variant).toBe(variant)
          },
        )

        it(
          'Изменения prop disabled должно изменять CoreButton',
          () => {
            const wrapper = mount(
              YSimpleButton,
              { props: { disabled: true } },
            )

            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.disabled).toBe(true)
          },
        )

        it(
          'Изменения prop loading должно изменять CoreButton',
          () => {
            const wrapper = mount(
              YSimpleButton,
              { props: { loading: true } },
            )

            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.loading).toBe(true)
          },
        )

        it(
          'Изменения prop href должно изменять CoreButton',
          () => {
            const wrapper = mount(
              YSimpleButton,
              { props: { href } },
            )

            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.href).toBe(href)
          },
        )

        it(
          'Изменения prop target должно изменять CoreButton',
          () => {
            const target = EAnchorTarget.BLANK

            const wrapper = mount(
              YSimpleButton,
              { props: { target } },
            )

            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.target).toBe(target)
          },
        )

        it(
          'Должен выставить дефолтное значение size если оно undefined',
          () => {
            const wrapper = mount(
              YSimpleButton,
              { props: { size: undefined } },
            )

            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.size).toBe(defaultSize)
          },
        )

        it(
          'Должен выставить дефолтное значение variant если оно undefined',
          () => {
            const wrapper = mount(
              YSimpleButton,
              { props: { variant: undefined } },
            )

            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.variant).toBe(defaultVariant)
          },
        )
      },
    )

    describe(
      'slots',
      () => {
        it(
          'Должен отрендерить верстку из default слота',
          () => {
            const wrapper = mount(
              YSimpleButton,
              { slots: { default: textWithTag } },
            )

            expect(wrapper.html()).toContain(textWithTag)
          },
        )
      },
    )

    describe(
      'events',
      () => {
        it(
          'Должен вызывать обработчик клика при нажатии на кнопку',
          async() => {
            const handleClick = vi.fn()

            const wrapper = mount(YSimpleButton)

            const coreElement = wrapper.find(tagName)

            coreElement.element.onclick = handleClick

            await coreElement.trigger('click')

            expect(handleClick).toHaveBeenCalledTimes(1)
          },
        )

        // Необходимо переписывать Core компонент, чтобы он выдал не нативные клики, а кастомные евенты, иначе disabled аттрибут на кнопке не отрабатывает
        it.skip(
          'Не должен вызывать обработчик клика, если кнопка отключена',
          async() => {
            const wrapper = mount(
              YSimpleButton,
              { props: { disabled: true } },
            )

            await wrapper.trigger('click')

            expect(wrapper.emitted('click')).toHaveLength(0)
          },
        )
      },
    )
  },
)
