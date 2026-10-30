import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { text } from '~shared/tests/slotContents'
import { AltCoreButtonTagName } from '~shared/constants'
import { AltCoreButton } from '~core/ui/button'
import { AltButton } from '~vue/ui/button'
import { altRocket } from '~shared/icons'
import type { TPropTestCase } from '~shared/types/tests'
import {
  createVueButtonProps,
  type IAltVueButtonProps,
} from '~vue/ui/button/models/types'
import type { IAltIcon } from '~shared/icons'

const {
  label: defaultLabel,
} = createVueButtonProps()

const tagName = AltCoreButtonTagName

// Unit tests cases:
const propLabelTestCases: TPropTestCase<IAltVueButtonProps, 'label'>[] = [
  {
    prop: 'label',
    case: 'with a value',
    value: text,
    expected: text,
  },
  {
    prop: 'label',
    case: 'without a value',
    value: undefined,
    expected: defaultLabel,
  },
]
const propIconLeftTestCases: TPropTestCase<IAltVueButtonProps, 'iconLeft'>[] = [
  {
    prop: 'iconLeft',
    case: 'with a value',
    value: altRocket,
    expected: altRocket,
  },
  {
    prop: 'iconLeft',
    case: 'without a value',
    value: undefined,
    expected: undefined,
  },
]
const propIconRightTestCases: TPropTestCase<IAltVueButtonProps, 'iconRight'>[] = [
  {
    prop: 'iconRight',
    case: 'with a value',
    value: altRocket,
    expected: altRocket,
  },
  {
    prop: 'iconRight',
    case: 'without a value',
    value: undefined,
    expected: undefined,
  },
]

describe(
  'Vue/AltCoreButton',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreButton,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of propLabelTestCases) {
          it(
            `Prop "${testCase.prop}" should set ${testCase.prop} on the core component to "${testCase.case}"`,
            () => {
              const wrapper = mount(
                AltButton,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName)

              expect(coreElement.element[testCase.prop]).toBe(testCase.expected)
            },
          )
        }
        for (const testCase of [
          ...propIconLeftTestCases,
          ...propIconRightTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" should set ${testCase.prop} on the core component to "${testCase.case}"`,
            () => {
              const wrapper = mount(
                AltButton,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName)

              expect(coreElement.element[testCase.prop]?.name).toBe((testCase.expected as Partial<IAltIcon> | undefined)?.name)
            },
          )
        }
      },
    )
  },
)
