import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { YCoreAvatarTagName as tagName } from '~shared/constants'
import { YAvatar } from '~vue/ui/avatar'
import { YCoreAvatar } from '~core/ui/avatar'
import {
  propDisabledTestCases, propIconTestCases,
  propInitialsTestCases,
  propPhotoTestCases,
  propSizeTestCases,
} from '~vue/ui/avatar/tests/cases/props'

describe(
  'Vue/YAvatar',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreAvatar,
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
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            () => {
              const wrapper = mount(
                YAvatar,
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
