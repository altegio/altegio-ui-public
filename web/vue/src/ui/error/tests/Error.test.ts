import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { text } from '~shared/tests/slotContents'
import { AltCoreErrorTagName } from '~shared/constants'
import { AltCoreError } from '~core/ui/error'

import { AltError } from '~vue/ui/error'

const tagName = AltCoreErrorTagName

describe(
  'Vue/AltError',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreError,
        )
      }
    })

    describe(
      'Props',
      () => {
        it(
          'Should update the errors prop of error',
          () => {
            const errors = [text]
            const wrapper = mount(
              AltError,
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
