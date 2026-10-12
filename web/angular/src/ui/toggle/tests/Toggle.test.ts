import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { empty, text } from '~shared/tests/slotContents'
import { YCoreToggleTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import type { IYNgToggleProps } from '~ng/ui/toggle/models/types'
import { EYCoreLabelAlignment } from '~core/ui/label/models/types'
import { EYSizes } from '~shared/types/global'
import { YToggle } from '~ng/ui/toggle'
import { DEFAULT_CHECKED_VALUE } from '~core/ui/simpleToggle/models/types'

import {
  slotAnnotationTestCases,
} from './cases/slots'

interface ICreateComponentArgs {
  slots?: {
    annotation?: string
  }
  props?: Partial<IYNgToggleProps>
}

const tagName = YCoreToggleTagName

const createComponent = async({ props, slots }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YToggle] }).compileComponents()

  @Component({
    template: `
      <YToggle
        [ngModel]="ngModel"
        [labelText]="labelText"
        [labelTooltipText]="labelTooltipText"
        [labelOverflowDebounce]="labelOverflowDebounce"
        [annotationText]="annotationText"
        [disabled]="disabled"
        [alignment]="alignment"
        [size]="size"
      >
        @if (slots?.annotation) {
          <ng-template #annotation><div>{{ slots.annotation }}</div></ng-template>
        }
      </YToggle>
    `,
    imports: [YToggle],
    standalone: true,
  })

  class TestComponent {
    ngModel = DEFAULT_CHECKED_VALUE
    labelText = props?.labelText
    labelTooltipText = props?.labelTooltipText
    annotationText = props?.annotationText
    labelOverflowDebounce = props?.labelOverflowDebounce
    disabled = props?.disabled
    alignment = props?.alignment
    size = props?.size
    slots = slots
  }
  return TestComponent
}

// Unit test cases:
const propDisabledTestCases: TPropTestCase<IYNgToggleProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'включен', value: true, expected: true },
  { prop: 'disabled', case: 'выключен', value: false, expected: false },
]
const propLabelTextTestCases: TPropTestCase<IYNgToggleProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'с контентом', value: text, expected: text },
  { prop: 'labelText', case: 'без контента', value: empty, expected: empty },
]
const propLabelTooltipTextTestCases: TPropTestCase<IYNgToggleProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'с контентом', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'без контента', value: empty, expected: empty },
]
const propAnnotationTextTestCases: TPropTestCase<IYNgToggleProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'с контентом', value: text, expected: text },
  { prop: 'annotationText', case: 'без контента', value: empty, expected: empty },
]
const propLabelOverflowDebounceCases: TPropTestCase<IYNgToggleProps, 'labelOverflowDebounce'>[] = [
  { prop: 'labelOverflowDebounce', case: 'с задержкой', value: 200, expected: 200 },
  { prop: 'labelOverflowDebounce', case: 'с задержкой', value: undefined, expected: 300 },
]
const propAlignmentCases: TPropTestCase<IYNgToggleProps, 'alignment'>[] = [
  { prop: 'alignment', case: 'выравнивание по центру', value: EYCoreLabelAlignment.CENTER, expected: EYCoreLabelAlignment.CENTER },
  { prop: 'alignment', case: 'выравнивание по верху', value: EYCoreLabelAlignment.TOP, expected: EYCoreLabelAlignment.TOP },
]
const propSizeCases: TPropTestCase<IYNgToggleProps, 'size'>[] = [
  { prop: 'size', case: 'размер M', value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'размер S', value: EYSizes.SMALL, expected: EYSizes.SMALL },
]

describe(
  'Angular/YToggle',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propLabelTextTestCases,
              ...propAlignmentCases,
              ...propAnnotationTextTestCases,
              ...propDisabledTestCases,
              ...propLabelOverflowDebounceCases,
              ...propLabelTooltipTextTestCases,
              ...propSizeCases,
            ]) {
              it(
                `Prop "${testCase.prop}" должен быть "${testCase.case}" и иметь значение "${testCase.value}"`,
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

        describe(
          'Slots',
          () => {
            for (const testCase of [...slotAnnotationTestCases]) {
              it(
                `Slot "${testCase.slot}" должен быть ${testCase.case}`,
                async() => {
                  const component = await createComponent({ slots: { [testCase.slot]: testCase.content } })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  const slotElement = (fixture.nativeElement as HTMLElement).querySelector(`[slot="${testCase.slot}"]`)

                  expect(slotElement?.textContent).toBe(testCase.content)
                },
              )
            }
          },
        )
      },
    )
  },
)
