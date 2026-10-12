import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { YCoreIconButtonTagName } from '~shared/constants'
import { yRocket } from '~shared/icons'
import { YCoreIconButton } from '~core/ui/iconButton'
import { YIconButton } from '~vue/ui/iconButton'

const tagName = YCoreIconButtonTagName

describe(
  'YIconButton',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreIconButton,
        )
      }
    })

    describe(
      'Props',
      () => {
        it(
          'Изменения prop icon должно изменять CoreIconButton',
          () => {
            const wrapper = mount(
              YIconButton,
              { props: { icon: yRocket } },
            )

            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.icon?.name).toBe(yRocket.name)
          },
        )
      },
    )
  },
)
