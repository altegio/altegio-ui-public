import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { altRocket } from '~shared/icons'
import { AltCoreIconTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { AltCoreIcon } from '~core/ui/icon'

import {
  createVueIconProps,
  type IAltVueIconProps,
} from '~vue/ui/icon/models/types'
import { AltIcon } from '~vue/ui/icon'

const { size: defaultSize } = createVueIconProps()
const tagName = AltCoreIconTagName

// Unit test cases:
const propIconTestCases: TPropTestCase<IAltVueIconProps, 'icon'>[] = [
  {
    prop: 'icon',
    case: 'with a value',
    value: altRocket,
  },
]
const propSizeTestCases: TPropTestCase<IAltVueIconProps, 'size'>[] = [
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
  'Vue/AltIcon',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreIcon,
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
                AltIcon,
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
                AltIcon,
                { props: { [testCase.prop]: testCase.value, icon: altRocket } },
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
