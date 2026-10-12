import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { text } from '~shared/tests/slotContents'
import { YCoreButtonTagName } from '~shared/constants'
import { YCoreButton } from '~core/ui/button'
import { YButton } from '~vue/ui/button'
import { yRocket } from '~shared/icons'
import type { TPropTestCase } from '~shared/types/tests'
import {
  createVueButtonProps,
  type IYVueButtonProps,
} from '~vue/ui/button/models/types'
import type { IYIcon } from '~shared/icons'

const {
  label: defaultLabel,
} = createVueButtonProps()

const tagName = YCoreButtonTagName

// Unit tests cases:
const propLabelTestCases: TPropTestCase<IYVueButtonProps, 'label'>[] = [
  {
    prop: 'label',
    case: 'со значением',
    value: text,
    expected: text,
  },
  {
    prop: 'label',
    case: 'без значения',
    value: undefined,
    expected: defaultLabel,
  },
]
const propIconLeftTestCases: TPropTestCase<IYVueButtonProps, 'iconLeft'>[] = [
  {
    prop: 'iconLeft',
    case: 'со значением',
    value: yRocket,
    expected: yRocket,
  },
  {
    prop: 'iconLeft',
    case: 'без значения',
    value: undefined,
    expected: undefined,
  },
]
const propIconRightTestCases: TPropTestCase<IYVueButtonProps, 'iconRight'>[] = [
  {
    prop: 'iconRight',
    case: 'со значением',
    value: yRocket,
    expected: yRocket,
  },
  {
    prop: 'iconRight',
    case: 'без значения',
    value: undefined,
    expected: undefined,
  },
]

describe(
  'Vue/YCoreButton',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreButton,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of propLabelTestCases) {
          it(
            `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента на "${testCase.case}"`,
            () => {
              const wrapper = mount(
                YButton,
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
            `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента на "${testCase.case}"`,
            () => {
              const wrapper = mount(
                YButton,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName)

              expect(coreElement.element[testCase.prop]?.name).toBe((testCase.expected as Partial<IYIcon> | undefined)?.name)
            },
          )
        }
      },
    )
  },
)
