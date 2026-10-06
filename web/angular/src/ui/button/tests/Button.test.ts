import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { text } from '~shared/tests/slotContents'
import { YCoreButtonTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import {
  createNgButtonProps,
  type IYNgButtonProps,
} from '~ng/ui/button/models/types'
import { YButton } from '~ng/ui/button'
import { yRocket } from '~shared/icons'
import type { IYIcon } from '~shared/icons'
interface ICreateComponentArgs {
  props?: Partial<IYNgButtonProps>
}

const {
  label: defaultLabel,
  iconLeft: defaultIconLeft,
  iconRight: defaultIconRight,
  fullWidth: defaultFullWidth,
} = createNgButtonProps()

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YButton] }).compileComponents()

  @Component({
    template: `
      <YButton
        [size]="size"
        [variant]="variant"
        [disabled]="disabled"
        [loading]="loading"
        [href]="href"
        [target]="target"
        [label]="label"
        [iconLeft]="iconLeft"
        [iconRight]="iconRight"
        [fullWidth]="fullWidth"
      />`,
    imports: [YButton],
    standalone: true,
  })
  class TestComponent {
    size = props?.size
    variant = props?.variant
    disabled = props?.disabled
    loading = props?.loading
    href = props?.href
    target = props?.target
    label = props?.label
    iconLeft = props?.iconLeft
    iconRight = props?.iconRight
    fullWidth = props?.fullWidth
  }
  return TestComponent
}

const tagName = YCoreButtonTagName

// Unit tests cases:
const propLabelTestCases: TPropTestCase<IYNgButtonProps, 'label'>[] = [
  {
    prop: 'label',
    case: 'со значением',
    value: text,
    expected: text,
  },
  {
    prop: 'label',
    case: 'без значения',
    value: undefined,
    expected: defaultLabel,
  },
]
const propIconLeftTestCases: TPropTestCase<IYNgButtonProps, 'iconLeft'>[] = [
  {
    prop: 'iconLeft',
    case: 'со значением',
    value: yRocket,
    expected: yRocket,
  },
  {
    prop: 'iconLeft',
    case: 'без значения',
    value: undefined,
    expected: defaultIconLeft,
  },
]
const propIconRightTestCases: TPropTestCase<IYNgButtonProps, 'iconRight'>[] = [
  {
    prop: 'iconRight',
    case: 'со значением',
    value: yRocket,
    expected: yRocket,
  },
  {
    prop: 'iconRight',
    case: 'без значения',
    value: undefined,
    expected: defaultIconRight,
  },
]

const fullWidthTestCases: TPropTestCase<IYNgButtonProps, 'fullWidth'>[] = [
  {
    prop: 'fullWidth',
    case: 'true',
    value: true,
    expected: '', // Для boolean атрибутов: true -> пустая строка (атрибут присутствует)
  },
  {
    prop: 'fullWidth',
    case: 'false',
    value: false,
    expected: null, // false -> атрибут отсутствует (null)
  },
  {
    prop: 'fullWidth',
    case: 'без значения (по умолчанию)',
    value: undefined,
    expected: defaultFullWidth ? '' : null, // зависит от дефолтного значения
  },
]

describe(
  'Angular/YButton',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of propLabelTestCases) {
          it(
            `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента на "${testCase.case}"`,
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

        for (const testCase of [
          ...propIconLeftTestCases,
          ...propIconRightTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента на "${testCase.case}"`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

              expect(coreElement?.[testCase.prop]?.name).toBe((testCase.expected as Partial<IYIcon> | undefined)?.name)
            },
          )
        }

        for (const testCase of fullWidthTestCases) {
          it(
            `Prop "fullWidth" должен изменить атрибут full-width у core компонента на "${testCase.case}"`,
            async() => {
              const component = await createComponent({ props: { fullWidth: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
              expect(coreElement?.getAttribute('full-width')).toBe(testCase.expected)
            },
          )
        }
      },
    )
  },
)
