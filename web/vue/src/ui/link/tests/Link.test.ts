import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { href } from '~shared/tests/mockData'
import { AltCoreLinkTagName } from '~shared/constants'
import { AltCoreLink } from '~core/ui/link'

import { AltLink } from '~vue/ui/link'

const tagName = AltCoreLinkTagName

describe(
  'Vue/AltLink',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
        tagName,
        AltCoreLink,
        )
      }
    })

    describe(
      'Props',
      () => {
        it(
          'Should pass href to the web component',
          () => {
            const wrapper = mount(
              AltLink,
              { props: { href } },
            )
            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.href).toBe(href)
          },
        )

        it(
          'Should handle an undefined href in the web component',
          () => {
            const wrapper = mount(
              AltLink,
              { props: { href: undefined } },
            )
            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.hasAttribute('href')).toBe(false)
          },
        )

        it(
          'Should pass target to the web component',
          () => {
            const target = '_blank'
            const wrapper = mount(
              AltLink,
              { props: { target } },
            )
            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.target).toBe(target)
          },
        )

        it(
          'Should handle an undefined target in the web component',
          () => {
            const wrapper = mount(
              AltLink,
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
