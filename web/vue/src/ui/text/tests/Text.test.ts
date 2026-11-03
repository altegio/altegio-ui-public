import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import type { TPropTestCase, TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'
import {
  EAltCoreTextSize,
  EAltCoreTextVariant,
  createCoreTextExternalProps,
} from '~core/ui/text/models/types'
import { AltCoreTextTagName } from '~shared/constants'
import { AltCoreText } from '~core/ui/text'
import { type IAltVueTextProps } from '~vue/ui/text/models/types'

import { AltText } from '~vue/ui/text'

const { size: defaultSize, variant: defaultVariant } = createCoreTextExternalProps()
const tagName = AltCoreTextTagName

// Unit test cases:
const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'default', case: 'with content', content: text },
  { slot: 'default', case: 'without content', content: empty },
]
const propSizeTestCases: TPropTestCase<IAltVueTextProps, 'size'>[] = [
  {
    prop: 'size',
    case: 'with a value',
    value: EAltCoreTextSize.A1_MEDIUM,
    expected: EAltCoreTextSize.A1_MEDIUM,
  },
  {
    prop: 'size',
    case: 'without a value',
    value: undefined,
    expected: defaultSize,
  },
]
const propVariantTestCases: TPropTestCase<IAltVueTextProps, 'variant'>[] = [
  {
    prop: 'variant',
    case: 'with a value',
    value: EAltCoreTextVariant.NEGATIVE,
    expected: EAltCoreTextVariant.NEGATIVE,
  },
  {
    prop: 'variant',
    case: 'without a value',
    value: undefined,
    expected: defaultVariant,
  },
]

describe(
  'Vue/AltText',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreText,
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
                AltText,
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
                AltText,
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
