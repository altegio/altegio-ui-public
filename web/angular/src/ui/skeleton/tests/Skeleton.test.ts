import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreSkeletonTagName as tagName } from '~shared/constants'
import { AltSkeleton } from '~ng/ui/skeleton'
import type { IAltNgSkeletonProps } from '~ng/ui/skeleton/models/types'
import { EAltCoreSkeletonShape } from '~core/ui/skeleton/models/types'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

const createFixture = async(props: Partial<IAltNgSkeletonProps>) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltSkeleton] }).compileComponents()

  @Component({
    template: `
      <AltSkeleton
        [size]="size"
        [shape]="shape"
        [width]="width"
        [height]="height"
      ></AltSkeleton>
    `,
    imports: [AltSkeleton],
    standalone: true,
  })
  class TestComponent {
    size = props.size
    shape = props.shape
    width = props.width
    height = props.height
  }

  const fixture = TestBed.createComponent(TestComponent)
  fixture.detectChanges()
  await fixture.whenStable()

  return fixture
}

const propTestCases: TPropTestCase<Required<IAltNgSkeletonProps>, keyof IAltNgSkeletonProps>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL },
  { prop: 'shape', case: 'circle', value: EAltCoreSkeletonShape.CIRCLE },
  { prop: 'width', case: 'a number', value: 120 },
  { prop: 'height', case: 'a CSS length', value: '2rem' },
]

describe(
  'Angular/AltSkeleton',
  () => {
    for (const testCase of propTestCases) {
      it(
        `Prop "${testCase.prop}" (${testCase.case}) should be set on the core component`,
        async() => {
          const fixture = await createFixture({ [testCase.prop]: testCase.value })

          const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)!

          expect(coreElement[testCase.prop]).toBe(testCase.value)
        },
      )
    }
  },
)
