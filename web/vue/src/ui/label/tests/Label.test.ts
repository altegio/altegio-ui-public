import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreLabelTagName as tagName } from '~shared/constants'
import { AltCoreLabel } from '~core/index'
import { createVueLabelProps, type IAltVueLabelProps } from '~vue/ui/label/models/types'
import { AltLabel } from '~vue/ui/label'
import { empty, text } from '~shared/tests/slotContents'
import { booleanTestValuesWithUndefined } from '~shared/tests/mockData'
import { generatePropTestCases } from '~shared/tests/utils'
import { EAltCoreLabelAlignment } from '~core/ui/label/models/types'
import { EAltCoreTextSize, EAltCoreTextVariant } from '~core/ui/text/models/types'

// Unit test cases:
const defaultProps = createVueLabelProps() as IAltVueLabelProps

const texts = [
  text,
  ' ',
  empty,
  undefined,
]
const propsTextTestCases = generatePropTestCases<IAltVueLabelProps, 'text'>(
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
const propsTooltipTextTestCases = generatePropTestCases<IAltVueLabelProps, 'tooltipText'>(
  'tooltipText',
  tooltipTexts,
  defaultProps,
)

const propsDisabledTestCases = generatePropTestCases<IAltVueLabelProps, 'disabled'>(
  'disabled',
  booleanTestValuesWithUndefined,
  defaultProps,
)

const propsRequiredTestCases = generatePropTestCases<IAltVueLabelProps, 'required'>(
  'required',
  booleanTestValuesWithUndefined,
  defaultProps,
)

const propsWrapTestCases = generatePropTestCases<IAltVueLabelProps, 'wrap'>(
  'wrap',
  booleanTestValuesWithUndefined,
  defaultProps,
)

const alignments: IAltVueLabelProps['alignment'][] = [
  ...Object.values(EAltCoreLabelAlignment),
  undefined,
]
const propsAlignmentTestCases = generatePropTestCases<IAltVueLabelProps, 'alignment'>(
  'alignment',
  alignments,
  defaultProps,
)

const variants = [
  EAltCoreTextVariant.PRIMARY,
  EAltCoreTextVariant.SECONDARY,
  undefined,
] as IAltVueLabelProps['variant'][]
const propsVariantTestCases = generatePropTestCases<IAltVueLabelProps, 'variant'>(
  'variant',
  variants,
  defaultProps,
)

const sizes: IAltVueLabelProps['size'][] = [
  EAltCoreTextSize.A2_REGULAR,
  EAltCoreTextSize.P2_REGULAR,
  undefined,
]
const propsSizeTestCases = generatePropTestCases<IAltVueLabelProps, 'size'>(
  'size',
  sizes,
  defaultProps,
)

describe(
  'Vue/AltLabel',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreLabel,
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
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
            () => {
              const wrapper = mount(
                AltLabel,
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
