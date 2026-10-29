import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { yRocket } from '~shared/icons'
import { YCoreIconTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { YCoreIcon } from '~core/ui/icon'

import {
  createVueIconProps,
  type IYVueIconProps,
} from '~vue/ui/icon/models/types'
import { YIcon } from '~vue/ui/icon'

const { size: defaultSize } = createVueIconProps()
const tagName = YCoreIconTagName

// Unit test cases:
const propIconTestCases: TPropTestCase<IYVueIconProps, 'icon'>[] = [
  {
    prop: 'icon',
    case: 'with a value',
    value: yRocket,
  },
]
const propSizeTestCases: TPropTestCase<IYVueIconProps, 'size'>[] = [
  {
    prop: 'size',
    case: 'with a value',
    value: '100px',
    expected: '100px',
  },
  {
    prop: 'size',
    case: 'without a value',
    value: undefined,
    expected: defaultSize,
  },
]

describe(
  'Vue/YIcon',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreIcon,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of propIconTestCases) {
          it(
            `Prop: ${testCase.prop} should work ${testCase.case} for the core component`,
            () => {
              const wrapper = mount(
                YIcon,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName)
              expect(coreElement.element.icon.name).toBe(testCase.value.name)
            },
          )
        }

        for (const testCase of propSizeTestCases) {
          it(
            `Prop: ${testCase.prop} should work ${testCase.case} for the core component`,
            () => {
              const wrapper = mount(
                YIcon,
                { props: { [testCase.prop]: testCase.value, icon: yRocket } },
              )

              const coreElement = wrapper.find(tagName)
              expect(coreElement.element.size).toBe(testCase.expected)
            },
          )
        }
      },
    )
  },
)
