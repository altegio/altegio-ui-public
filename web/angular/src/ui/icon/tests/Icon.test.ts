import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'

import { altRocket } from '~shared/icons'
import { AltCoreIconTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'

import { AltIcon } from '~ng/ui/icon'

import {
  createNgIconProps,
  type IAltNgIconProps,
} from '~ng/ui/icon/models/types'

interface ICreateComponentArgs {
  props?: Partial<IAltNgIconProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltIcon] }).compileComponents()

  @Component({
    template: '<AltIcon [size]="size" [icon]="icon">',
    imports: [AltIcon],
    standalone: true,
  })
  class TestComponent {
    size = props?.size
    icon = props?.icon
  }
  return TestComponent
}

const { size: defaultSize } = createNgIconProps()
const tagName = AltCoreIconTagName

// Unit test cases:
const propIconTestCases: TPropTestCase<IAltNgIconProps, 'icon'>[] = [
  {
    prop: 'icon',
    case: 'with a value',
    value: altRocket,
  },
]
const propSizeTestCases: TPropTestCase<IAltNgIconProps, 'size'>[] = [
  {
    prop: 'size',
    case: 'with a value',
    value: '100px',
    expected: '100px',
  },
  {
    prop: 'size',
    case: 'without a value',
    value: undefined,
    expected: defaultSize,
  },
]

describe(
  'Angular/AltIcon',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of propIconTestCases) {
          it(
            `Prop: ${testCase.prop} should work ${testCase.case} for the core component`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
              expect(coreElement?.icon.name).toBe(testCase.value.name)
            },
          )
        }

        for (const testCase of propSizeTestCases) {
          it(
            `Prop: ${testCase.prop} should work ${testCase.case} for the core component`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value, icon: altRocket } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
              expect(coreElement?.size).toBe(testCase.expected)
            },
          )
        }
      },
    )
  },
)
