import { describe, expect, it } from 'vitest'
import { AltCoreLabelTagName as tagName } from '~shared/constants'
import { TestBed } from '~ng/tests/setup'
import { createNgLabelProps, type IAltNgLabelProps } from '~ng/ui/label/models/types'
import { text, empty } from '~shared/tests/slotContents'
import { AltLabel } from '~ng/ui/label'
import { Component } from '@angular/core'
import { booleanTestValuesWithUndefined } from '~shared/tests/mockData'
import { generatePropTestCases } from '~shared/tests/utils'
import { EAltCoreLabelAlignment } from '~core/ui/label/models/types'
import { EAltCoreTextSize, EAltCoreTextVariant } from '~core/ui/text/models/types'

interface ICreateComponentArgs {
  props?: Partial<IAltNgLabelProps>
}

// Unit test cases:
const defaultProps = createNgLabelProps()

const texts = [
  text,
  ' ',
  empty,
  undefined,
]
const propsTextTestCases = generatePropTestCases<IAltNgLabelProps, 'text'>(
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
const propsTooltipTextTestCases = generatePropTestCases<IAltNgLabelProps, 'tooltipText'>(
  'tooltipText',
  tooltipTexts,
  defaultProps,
)

const propsDisabledTestCases = generatePropTestCases<IAltNgLabelProps, 'disabled'>(
  'disabled',
  booleanTestValuesWithUndefined,
  defaultProps,
)

const propsRequiredTestCases = generatePropTestCases<IAltNgLabelProps, 'required'>(
  'required',
  booleanTestValuesWithUndefined,
  defaultProps,
)

const propsWrapTestCases = generatePropTestCases<IAltNgLabelProps, 'wrap'>(
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
const propsDebounceTestCases = generatePropTestCases<IAltNgLabelProps, 'debounce'>(
  'debounce',
  debounceTestCaseValues,
  defaultProps,
)

const propsTooltipActiveTestCases = generatePropTestCases<IAltNgLabelProps, 'tooltipActive'>(
  'tooltipActive',
  booleanTestValuesWithUndefined,
  defaultProps,
)


const alignments: IAltNgLabelProps['alignment'][] = [
  ...Object.values(EAltCoreLabelAlignment),
  undefined,
]
const propsAlignmentTestCases = generatePropTestCases<IAltNgLabelProps, 'alignment'>(
  'alignment',
  alignments,
  defaultProps,
)

const variants = [
  EAltCoreTextVariant.PRIMARY,
  EAltCoreTextVariant.SECONDARY,
  undefined,
] as IAltNgLabelProps['variant'][]
const propsVariantTestCases = generatePropTestCases<IAltNgLabelProps, 'variant'>(
  'variant',
  variants,
  defaultProps,
)

const sizes: IAltNgLabelProps['size'][] = [
  EAltCoreTextSize.A2_REGULAR,
  EAltCoreTextSize.P2_REGULAR,
  undefined,
]
const propsSizeTestCases = generatePropTestCases<IAltNgLabelProps, 'size'>(
  'size',
  sizes,
  defaultProps,
)


const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltLabel] }).compileComponents()

  @Component({
    template: `
      <AltLabel
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
      </AltLabel>`,
    imports: [AltLabel],
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
  'Angular/AltLabel',
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
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
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


