import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'

import { yRocket } from '~shared/icons'
import { YCoreIconTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'

import { YIcon } from '~ng/ui/icon'

import {
  createNgIconProps,
  type IYNgIconProps,
} from '~ng/ui/icon/models/types'

interface ICreateComponentArgs {
  props?: Partial<IYNgIconProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YIcon] }).compileComponents()

  @Component({
    template: '<YIcon [size]="size" [icon]="icon">',
    imports: [YIcon],
    standalone: true,
  })
  class TestComponent {
    size = props?.size
    icon = props?.icon
  }
  return TestComponent
}

const { size: defaultSize } = createNgIconProps()
const tagName = YCoreIconTagName

// Unit test cases:
const propIconTestCases: TPropTestCase<IYNgIconProps, 'icon'>[] = [
  {
    prop: 'icon',
    case: 'со значением',
    value: yRocket,
  },
]
const propSizeTestCases: TPropTestCase<IYNgIconProps, 'size'>[] = [
  {
    prop: 'size',
    case: 'со значением',
    value: '100px',
    expected: '100px',
  },
  {
    prop: 'size',
    case: 'без значения',
    value: undefined,
    expected: defaultSize,
  },
]

describe(
  'Angular/YIcon',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of propIconTestCases) {
          it(
            `Prop: ${testCase.prop} должен быть ${testCase.case} для core компонента`,
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
            `Prop: ${testCase.prop} должен быть ${testCase.case} для core компонента`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value, icon: yRocket } })
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
