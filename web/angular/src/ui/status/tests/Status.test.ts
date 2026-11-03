import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreStatusTagName as tagName } from '~shared/constants'
import { AltStatus } from '~ng/ui/status'
import type { IAltNgStatusProps } from '~ng/ui/status/models/types'
import { EAltCoreStatusVariant } from '~core/ui/status/models/types'
import { altSmile } from '~shared/icons'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

const createFixture = async(props: Partial<IAltNgStatusProps>) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltStatus] }).compileComponents()

  @Component({
    template: `
      <AltStatus
        [variant]="variant"
        [text]="text"
        [size]="size"
        [icon]="icon"
      ><a href="#">Details</a></AltStatus>
    `,
    imports: [AltStatus],
    standalone: true,
  })
  class TestComponent {
    variant = props.variant
    text = props.text ?? ''
    size = props.size
    icon = props.icon
  }

  const fixture = TestBed.createComponent(TestComponent)
  fixture.detectChanges()
  await fixture.whenStable()

  return fixture
}

const propTestCases: TPropTestCase<Required<IAltNgStatusProps>, keyof IAltNgStatusProps>[] = [
  { prop: 'variant', case: 'success', value: EAltCoreStatusVariant.SUCCESS },
  { prop: 'text', case: 'with text', value: 'Request sent' },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM },
  { prop: 'icon', case: 'an icon', value: altSmile },
]

describe(
  'Angular/AltStatus',
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

    it(
      'Should project content into the core component',
      async() => {
        const fixture = await createFixture({})

        expect((fixture.nativeElement as HTMLElement).querySelector(`${tagName} a`)?.textContent).toBe('Details')
      },
    )
  },
)
