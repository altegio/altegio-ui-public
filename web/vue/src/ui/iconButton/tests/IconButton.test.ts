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
