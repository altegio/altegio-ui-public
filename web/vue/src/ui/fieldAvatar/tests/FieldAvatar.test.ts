import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreFieldAvatarTagName as tagName } from '~shared/constants'
import { AltFieldAvatar } from '~vue/ui/fieldAvatar'
import { AltCoreFieldAvatar } from '~core/ui/fieldAvatar'
import {
  propDisabledTestCases, propIconTestCases,
  propInitialsTestCases,
  propPhotoTestCases,
  propSizeTestCases,
} from './cases/props'

describe(
  'Vue/AltFieldAvatar',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreFieldAvatar,
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
                AltFieldAvatar,
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
