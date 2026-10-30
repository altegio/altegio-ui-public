import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { empty, text } from '~shared/tests/slotContents'
import { AltCoreToggleTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import type { IAltNgToggleProps } from '~ng/ui/toggle/models/types'
import { EAltCoreLabelAlignment } from '~core/ui/label/models/types'
import { EAltSizes } from '~shared/types/global'
import { AltToggle } from '~ng/ui/toggle'
import { DEFAULT_CHECKED_VALUE } from '~core/ui/simpleToggle/models/types'

import {
  slotAnnotationTestCases,
} from './cases/slots'

interface ICreateComponentArgs {
  slots?: {
    annotation?: string
  }
  props?: Partial<IAltNgToggleProps>
}

const tagName = AltCoreToggleTagName

const createComponent = async({ props, slots }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltToggle] }).compileComponents()

  @Component({
    template: `
      <AltToggle
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
      </AltToggle>
    `,
    imports: [AltToggle],
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
const propDisabledTestCases: TPropTestCase<IAltNgToggleProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'enabled', value: true, expected: true },
  { prop: 'disabled', case: 'disabled', value: false, expected: false },
]
const propLabelTextTestCases: TPropTestCase<IAltNgToggleProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'with content', value: text, expected: text },
  { prop: 'labelText', case: 'without content', value: empty, expected: empty },
]
const propLabelTooltipTextTestCases: TPropTestCase<IAltNgToggleProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'with content', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'without content', value: empty, expected: empty },
]
const propAnnotationTextTestCases: TPropTestCase<IAltNgToggleProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'with content', value: text, expected: text },
  { prop: 'annotationText', case: 'without content', value: empty, expected: empty },
]
const propLabelOverflowDebounceCases: TPropTestCase<IAltNgToggleProps, 'labelOverflowDebounce'>[] = [
  { prop: 'labelOverflowDebounce', case: 'with a delay', value: 200, expected: 200 },
  { prop: 'labelOverflowDebounce', case: 'with a delay', value: undefined, expected: 300 },
]
const propAlignmentCases: TPropTestCase<IAltNgToggleProps, 'alignment'>[] = [
  { prop: 'alignment', case: 'center alignment', value: EAltCoreLabelAlignment.CENTER, expected: EAltCoreLabelAlignment.CENTER },
  { prop: 'alignment', case: 'top alignment', value: EAltCoreLabelAlignment.TOP, expected: EAltCoreLabelAlignment.TOP },
]
const propSizeCases: TPropTestCase<IAltNgToggleProps, 'size'>[] = [
  { prop: 'size', case: 'size M', value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'size S', value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
]

describe(
  'Angular/AltToggle',
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
                `Prop "${testCase.prop}" should be "${testCase.case}" and have value "${testCase.value}"`,
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
                `Slot "${testCase.slot}" should render ${testCase.case}`,
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
