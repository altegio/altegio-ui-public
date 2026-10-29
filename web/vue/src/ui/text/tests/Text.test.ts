import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import type { TPropTestCase, TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'
import {
  EYCoreTextSize,
  EYCoreTextVariant,
  createCoreTextExternalProps,
} from '~core/ui/text/models/types'
import { YCoreTextTagName } from '~shared/constants'
import { YCoreText } from '~core/ui/text'
import { type IYVueTextProps } from '~vue/ui/text/models/types'

import { YText } from '~vue/ui/text'

const { size: defaultSize, variant: defaultVariant } = createCoreTextExternalProps()
const tagName = YCoreTextTagName

// Unit test cases:
const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'default', case: 'with content', content: text },
  { slot: 'default', case: 'without content', content: empty },
]
const propSizeTestCases: TPropTestCase<IYVueTextProps, 'size'>[] = [
  {
    prop: 'size',
    case: 'with a value',
    value: EYCoreTextSize.A1_MEDIUM,
    expected: EYCoreTextSize.A1_MEDIUM,
  },
  {
    prop: 'size',
    case: 'without a value',
    value: undefined,
    expected: defaultSize,
  },
]
const propVariantTestCases: TPropTestCase<IYVueTextProps, 'variant'>[] = [
  {
    prop: 'variant',
    case: 'with a value',
    value: EYCoreTextVariant.NEGATIVE,
    expected: EYCoreTextVariant.NEGATIVE,
  },
  {
    prop: 'variant',
    case: 'without a value',
    value: undefined,
    expected: defaultVariant,
  },
]

describe(
  'Vue/YText',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreText,
        )
      }
    })


    describe(
      'Slots',
      () => {
        for (const testCase of slotDefaultTestCases) {
          it(
            `Slot "${testCase.slot}" should render ${testCase.case}`,
            () => {
              const wrapper = mount(
                YText,
                { slots: { default: testCase.content } },
              )

              expect(wrapper.text()).toBe(testCase.content)
            },
          )
        }
      },
    )

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propSizeTestCases,
          ...propVariantTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" should set ${testCase.prop} on the core component`,
            () => {
              const wrapper = mount(
                YText,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName)

              expect(coreElement.element[testCase.prop]).toBe(testCase.expected)
            },
          )
        }
      },
    )
  },
)
