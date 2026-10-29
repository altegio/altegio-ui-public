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
          'Changing prop size should update CoreButton',
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
          'Changing prop variant should update CoreButton',
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
          'Changing prop disabled should update CoreButton',
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
          'Changing prop loading should update CoreButton',
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
          'Changing prop href should update CoreButton',
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
          'Changing prop target should update CoreButton',
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
          'Should set the default size when it is undefined',
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
          'Should set the default variant when it is undefined',
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
          'Should render the markup from the default slot',
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
          'Should call the click handler on button click',
          async() => {
            const handleClick = vi.fn()

            const wrapper = mount(YSimpleButton)

            const coreElement = wrapper.find(tagName)

            coreElement.element.onclick = handleClick

            await coreElement.trigger('click')

            expect(handleClick).toHaveBeenCalledTimes(1)
          },
        )

        // Skipped: the core button emits native clicks, so the disabled attribute does not block them. The core component has to emit custom events instead.
        it.skip(
          'Should not call the click handler when the button is disabled',
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
