import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { href } from '~shared/tests/mockData'
import { YCoreLinkTagName } from '~shared/constants'
import { YCoreLink } from '~core/ui/link'

import { YLink } from '~vue/ui/link'

const tagName = YCoreLinkTagName

describe(
  'Vue/YLink',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
        tagName,
        YCoreLink,
        )
      }
    })

    describe(
      'Props',
      () => {
        it(
          'Должен корректно передать href в Web Component',
          () => {
            const wrapper = mount(
              YLink,
              { props: { href } },
            )
            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.href).toBe(href)
          },
        )

        it(
          'Должен корректно обработать undefined href в Web Component',
          () => {
            const wrapper = mount(
              YLink,
              { props: { href: undefined } },
            )
            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.hasAttribute('href')).toBe(false)
          },
        )

        it(
          'Должен корректно передать target в Web Component',
          () => {
            const target = '_blank'
            const wrapper = mount(
              YLink,
              { props: { target } },
            )
            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.target).toBe(target)
          },
        )

        it(
          'Должен корректно обработать undefined target в Web Component',
          () => {
            const wrapper = mount(
              YLink,
              { props: { target: undefined } },
            )
            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.hasAttribute('target')).toBe(false)
          },
        )
      },
    )
  },
)
