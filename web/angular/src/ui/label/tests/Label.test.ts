import { describe, expect, it } from 'vitest'
import { YCoreLabelTagName as tagName } from '~shared/constants'
import { TestBed } from '~ng/tests/setup'
import { createNgLabelProps, type IYNgLabelProps } from '~ng/ui/label/models/types'
import { text, empty } from '~shared/tests/slotContents'
import { YLabel } from '~ng/ui/label'
import { Component } from '@angular/core'
import { booleanTestValuesWithUndefined } from '~shared/tests/mockData'
import { generatePropTestCases } from '~shared/tests/utils'
import { EYCoreLabelAlignment } from '~core/ui/label/models/types'
import { EYCoreTextSize, EYCoreTextVariant } from '~core/ui/text/models/types'

interface ICreateComponentArgs {
  props?: Partial<IYNgLabelProps>
}

// Unit test cases:
const defaultProps = createNgLabelProps()

const texts = [
  text,
  ' ',
  empty,
  undefined,
]
const propsTextTestCases = generatePropTestCases<IYNgLabelProps, 'text'>(
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
const propsTooltipTextTestCases = generatePropTestCases<IYNgLabelProps, 'tooltipText'>(
  'tooltipText',
  tooltipTexts,
  defaultProps,
)

const propsDisabledTestCases = generatePropTestCases<IYNgLabelProps, 'disabled'>(
  'disabled',
  booleanTestValuesWithUndefined,
  defaultProps,
)

const propsRequiredTestCases = generatePropTestCases<IYNgLabelProps, 'required'>(
  'required',
  booleanTestValuesWithUndefined,
  defaultProps,
)

const propsWrapTestCases = generatePropTestCases<IYNgLabelProps, 'wrap'>(
  'wrap',
  booleanTestValuesWithUndefined,
  defaultProps,
)
const debounceTestCaseValues = [
  0,
  50,
  100,
  undefined,
]
const propsDebounceTestCases = generatePropTestCases<IYNgLabelProps, 'debounce'>(
  'debounce',
  debounceTestCaseValues,
  defaultProps,
)

const propsTooltipActiveTestCases = generatePropTestCases<IYNgLabelProps, 'tooltipActive'>(
  'tooltipActive',
  booleanTestValuesWithUndefined,
  defaultProps,
)


const alignments: IYNgLabelProps['alignment'][] = [
  ...Object.values(EYCoreLabelAlignment),
  undefined,
]
const propsAlignmentTestCases = generatePropTestCases<IYNgLabelProps, 'alignment'>(
  'alignment',
  alignments,
  defaultProps,
)

const variants = [
  EYCoreTextVariant.PRIMARY,
  EYCoreTextVariant.SECONDARY,
  undefined,
] as IYNgLabelProps['variant'][]
const propsVariantTestCases = generatePropTestCases<IYNgLabelProps, 'variant'>(
  'variant',
  variants,
  defaultProps,
)

const sizes: IYNgLabelProps['size'][] = [
  EYCoreTextSize.A2_REGULAR,
  EYCoreTextSize.P2_REGULAR,
  undefined,
]
const propsSizeTestCases = generatePropTestCases<IYNgLabelProps, 'size'>(
  'size',
  sizes,
  defaultProps,
)


const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YLabel] }).compileComponents()

  @Component({
    template: `
      <YLabel
        [text]="text"
        [tooltipText]="tooltipText"
        [alignment]="alignment"
        [debounce]="debounce"
        [tooltipActive]="tooltipActive"
        [wrap]="wrap"
        [size]="size"
        [variant]="variant"
        [required]="required"
        [disabled]="disabled"
      >
      </YLabel>`,
    imports: [YLabel],
    standalone: true,
  })
  class TestComponent {
    text = props?.text
    tooltipText = props?.tooltipText
    alignment = props?.alignment
    disabled = props?.disabled
    required = props?.required
    debounce = props?.debounce
    tooltipActive = props?.tooltipActive
    wrap = props?.wrap
    size = props?.size
    variant = props?.variant
  }
  return TestComponent
}

describe(
  'Angular/YLabel',
  () => {
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
          ...propsDebounceTestCases,
          ...propsTooltipActiveTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)

              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

              expect(coreElement?.[testCase.prop]).toBe(testCase.expected)
            },
          )
        }
      },
    )
  },
)


