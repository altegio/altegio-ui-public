import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { text } from '~shared/tests/slotContents'
import { YCoreErrorTagName } from '~shared/constants'
import { YCoreError } from '~core/ui/error'

import { YError } from '~vue/ui/error'

const tagName = YCoreErrorTagName

describe(
  'Vue/YError',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreError,
        )
      }
    })

    describe(
      'Props',
      () => {
        it(
          'Должен корректно изменить errors prop error',
          () => {
            const errors = [text]
            const wrapper = mount(
              YError,
              { props: { errors } },
            )

            const coreElement = wrapper.find(tagName)

            expect(coreElement.element.errors?.[0]).toBe(errors[0])
          },
        )
      },
)
  },
)
