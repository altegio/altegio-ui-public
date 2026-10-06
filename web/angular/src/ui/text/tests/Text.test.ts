import { describe, expect, it } from 'vitest'
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { EYCoreTextSize, EYCoreTextVariant, createCoreTextExternalProps } from '~core/ui/text/models/types'
import { YCoreTextTagName } from '~shared/constants'
import type { TPropTestCase, TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'
import { YText } from '~ng/ui/text'

import { type IYNgTextProps } from '~ng/ui/text/models/types'

interface ICreateComponentArgs {
  slots?: {
    default?: string
  }
  props?: Partial<IYNgTextProps>
}
const createComponent = async({ slots, props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YText] }).compileComponents()

  @Component({
    template: '<YText [size]="size" [variant]="variant">{{content}}</YText>',
    imports: [YText],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  class TestComponent {
    size = props?.size
    variant = props?.variant
    content = slots?.default || ''
  }
  return TestComponent
}

const { size: defaultSize, variant: defaultVariant } = createCoreTextExternalProps()
const tagName = YCoreTextTagName

// Unit test cases:
const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'default', case: 'с контентом', content: text },
  { slot: 'default', case: 'без контента', content: empty },
]
const propSizeTestCases: TPropTestCase<IYNgTextProps, 'size'>[] = [
  {
    prop: 'size',
    case: 'со значением',
    value: EYCoreTextSize.A1_MEDIUM,
    expected: EYCoreTextSize.A1_MEDIUM,
  },
  {
    prop: 'size',
    case: 'без значения',
    value: undefined,
    expected: defaultSize,
  },
]
const propVariantTestCases: TPropTestCase<IYNgTextProps, 'variant'>[] = [
  {
    prop: 'variant',
    case: 'со значением',
    value: EYCoreTextVariant.NEGATIVE,
    expected: EYCoreTextVariant.NEGATIVE,
  },
  {
    prop: 'variant',
    case: 'без значения',
    value: undefined,
    expected: defaultVariant,
  },
]

describe(
  'Angular/YText',
  () => {
    describe(
      'Slots',
      () => {
        for (const testCase of slotDefaultTestCases) {
          it(
            `Slot "${testCase.slot}" должен быть ${testCase.case}`,
            async() => {
              const component = await createComponent({
                slots: { [testCase.slot]: testCase.content },
                props: {},
              })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              expect((fixture.nativeElement as HTMLElement).textContent).toBe(testCase.content)
            },
          )
        }
      },
    )

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propSizeTestCases,
          ...propVariantTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
            async() => {
              const component = await createComponent({
                slots: {},
                props: { [testCase.prop]: testCase.value },
              })
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
