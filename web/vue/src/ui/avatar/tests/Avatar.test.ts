import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreAvatarTagName as tagName } from '~shared/constants'
import { AltAvatar } from '~vue/ui/avatar'
import { AltCoreAvatar } from '~core/ui/avatar'
import {
  propDisabledTestCases, propIconTestCases,
  propInitialsTestCases,
  propPhotoTestCases,
  propSizeTestCases,
} from '~vue/ui/avatar/tests/cases/props'

describe(
  'Vue/AltAvatar',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreAvatar,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propDisabledTestCases,
          ...propSizeTestCases,
          ...propInitialsTestCases,
          ...propPhotoTestCases,
          ...propIconTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
            () => {
              const wrapper = mount(
                AltAvatar,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName)

              expect(coreElement.element[testCase.prop]).toStrictEqual(testCase.expected)
            },
          )
        }
      },
    )
  },
)
