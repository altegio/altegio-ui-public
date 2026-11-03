import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreIconButtonTagName } from '~shared/constants'
import { altRocket } from '~shared/icons'
import { AltCoreIconButton } from '~core/ui/iconButton'
import { AltIconButton } from '~vue/ui/iconButton'

const tagName = AltCoreIconButtonTagName

describe(
  'AltIconButton',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreIconButton,
        )
      }
    })

    describe(
      'Props',
      () => {
        it(
          'Prop accessibleName should set accessibleName on the core component',
          () => {
            const wrapper = mount(
              AltIconButton,
              { props: { icon: altRocket, accessibleName: 'Search' } },
            )

            expect(wrapper.find(tagName).element.accessibleName).toBe('Search')
          },
        )

        it.each([
          { case: 'submit', value: 'submit' as const, expected: 'submit' },
          { case: 'undefined', value: undefined, expected: 'button' },
        ])(
          'Prop type ($case) should set type on the core component',
          ({ value, expected }) => {
            const wrapper = mount(
              AltIconButton,
              { props: { icon: altRocket, type: value } },
            )

            expect(wrapper.find(tagName).element.type).toBe(expected)
          },
        )

        it(
          'Changing prop icon should update CoreIconButton',
          () => {
            const wrapper = mount(
              AltIconButton,
              { props: { icon: altRocket } },
            )

            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.icon?.name).toBe(altRocket.name)
          },
        )
      },
    )
  },
)
