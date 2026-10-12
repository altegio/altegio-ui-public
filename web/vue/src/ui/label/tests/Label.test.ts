import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { YCoreLabelTagName as tagName } from '~shared/constants'
import { YCoreLabel } from '~core/index'
import { createVueLabelProps, type IYVueLabelProps } from '~vue/ui/label/models/types'
import { YLabel } from '~vue/ui/label'
import { empty, text } from '~shared/tests/slotContents'
import { booleanTestValuesWithUndefined } from '~shared/tests/mockData'
import { generatePropTestCases } from '~shared/tests/utils'
import { EYCoreLabelAlignment } from '~core/ui/label/models/types'
import { EYCoreTextSize, EYCoreTextVariant } from '~core/ui/text/models/types'

// Unit test cases:
const defaultProps = createVueLabelProps() as IYVueLabelProps

const texts = [
  text,
  ' ',
  empty,
  undefined,
]
const propsTextTestCases = generatePropTestCases<IYVueLabelProps, 'text'>(
  'text',
  texts,
  defaultProps,
)

const tooltipTexts = [
  text,
  ' ',
  empty,
  undefined,
]
const propsTooltipTextTestCases = generatePropTestCases<IYVueLabelProps, 'tooltipText'>(
  'tooltipText',
  tooltipTexts,
  defaultProps,
)

const propsDisabledTestCases = generatePropTestCases<IYVueLabelProps, 'disabled'>(
  'disabled',
  booleanTestValuesWithUndefined,
  defaultProps,
)

const propsRequiredTestCases = generatePropTestCases<IYVueLabelProps, 'required'>(
  'required',
  booleanTestValuesWithUndefined,
  defaultProps,
)

const propsWrapTestCases = generatePropTestCases<IYVueLabelProps, 'wrap'>(
  'wrap',
  booleanTestValuesWithUndefined,
  defaultProps,
)

const alignments: IYVueLabelProps['alignment'][] = [
  ...Object.values(EYCoreLabelAlignment),
  undefined,
]
const propsAlignmentTestCases = generatePropTestCases<IYVueLabelProps, 'alignment'>(
  'alignment',
  alignments,
  defaultProps,
)

const variants = [
  EYCoreTextVariant.PRIMARY,
  EYCoreTextVariant.SECONDARY,
  undefined,
] as IYVueLabelProps['variant'][]
const propsVariantTestCases = generatePropTestCases<IYVueLabelProps, 'variant'>(
  'variant',
  variants,
  defaultProps,
)

const sizes: IYVueLabelProps['size'][] = [
  EYCoreTextSize.A2_REGULAR,
  EYCoreTextSize.P2_REGULAR,
  undefined,
]
const propsSizeTestCases = generatePropTestCases<IYVueLabelProps, 'size'>(
  'size',
  sizes,
  defaultProps,
)

describe(
  'Vue/YLabel',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreLabel,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propsTextTestCases,
          ...propsTooltipTextTestCases,
          ...propsDisabledTestCases,
          ...propsRequiredTestCases,
          ...propsWrapTestCases,
          ...propsAlignmentTestCases,
          ...propsVariantTestCases,
          ...propsSizeTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            () => {
              const wrapper = mount(
                YLabel,
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
