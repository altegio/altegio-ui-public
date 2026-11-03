import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreLinearProgressTagName as tagName } from '~shared/constants'
import { AltLinearProgress } from '~ng/ui/linearProgress'
import type { IAltNgLinearProgressProps } from '~ng/ui/linearProgress/models/types'
import { EAltCoreLinearProgressVariant } from '~core/ui/linearProgress/models/types'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

const createFixture = async(props: Partial<IAltNgLinearProgressProps>) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltLinearProgress] }).compileComponents()

  @Component({
    template: `
      <AltLinearProgress
        [value]="value"
        [max]="max"
        [indeterminate]="indeterminate"
        [size]="size"
        [variant]="variant"
        [accessibleName]="accessibleName"
        [valueText]="valueText"
      ></AltLinearProgress>
    `,
    imports: [AltLinearProgress],
    standalone: true,
  })
  class TestComponent {
    value = props.value
    max = props.max
    indeterminate = props.indeterminate
    size = props.size
    variant = props.variant
    accessibleName = props.accessibleName
    valueText = props.valueText
  }

  const fixture = TestBed.createComponent(TestComponent)
  fixture.detectChanges()
  await fixture.whenStable()

  return fixture
}

const propTestCases: TPropTestCase<Required<IAltNgLinearProgressProps>, keyof IAltNgLinearProgressProps>[] = [
  { prop: 'value', case: 'a number', value: 40 },
  { prop: 'max', case: 'a number', value: 5 },
  { prop: 'indeterminate', case: 'true', value: true },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM },
  { prop: 'variant', case: 'negative', value: EAltCoreLinearProgressVariant.NEGATIVE },
  { prop: 'accessibleName', case: 'with text', value: 'Uploading' },
  { prop: 'valueText', case: 'with text', value: 'Step 2 of 5' },
]

describe(
  'Angular/AltLinearProgress',
  () => {
    for (const testCase of propTestCases) {
      it(
        `Input "${testCase.prop}" (${testCase.case}) should be set on the core component`,
        async() => {
          const fixture = await createFixture({ [testCase.prop]: testCase.value })

          const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)!

          expect(coreElement[testCase.prop]).toBe(testCase.value)
        },
      )
    }
  },
)
