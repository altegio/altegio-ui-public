import { beforeAll, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { textWithTag } from '~shared/tests/slotContents'
import { href } from '~shared/tests/mockData'
import { EAnchorTarget, EAltSizes } from '~shared/types/global'
import { createCoreSimpleButtonProps, EAltCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'

import { AltCoreSimpleButtonTagName } from '~shared/constants'

import { AltCoreSimpleButton } from '~core/ui/simpleButton'
import { AltSimpleButton } from '~vue/ui/simpleButton'

const {
  size: defaultSize,
  variant: defaultVariant,
} = createCoreSimpleButtonProps()

const tagName = AltCoreSimpleButtonTagName

describe(
  'Vue/AltSimpleButton',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreSimpleButton,
        )
      }
    })

    describe(
      'props',
      () => {
        it(
          'Changing prop size should update CoreButton',
          () => {
            const size = EAltSizes.MEDIUM

            const wrapper = mount(
              AltSimpleButton,
              { props: { size } },
            )

            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.size).toBe(size)
          },
        )

        it(
          'Changing prop variant should update CoreButton',
          () => {
            const variant = EAltCoreSimpleButtonVariant.OUTLINE

            const wrapper = mount(
              AltSimpleButton,
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
              AltSimpleButton,
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
              AltSimpleButton,
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
              AltSimpleButton,
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
              AltSimpleButton,
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
              AltSimpleButton,
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
              AltSimpleButton,
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
              AltSimpleButton,
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

            const wrapper = mount(AltSimpleButton)

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
              AltSimpleButton,
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
