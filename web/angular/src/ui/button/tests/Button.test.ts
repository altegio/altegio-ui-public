import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { text } from '~shared/tests/slotContents'
import { AltCoreButtonTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import {
  createNgButtonProps,
  type IAltNgButtonProps,
} from '~ng/ui/button/models/types'
import { AltButton } from '~ng/ui/button'
import { altRocket } from '~shared/icons'
import type { IAltIcon } from '~shared/icons'
interface ICreateComponentArgs {
  props?: Partial<IAltNgButtonProps>
}

const {
  label: defaultLabel,
  iconLeft: defaultIconLeft,
  iconRight: defaultIconRight,
  fullWidth: defaultFullWidth,
} = createNgButtonProps()

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltButton] }).compileComponents()

  @Component({
    template: `
      <AltButton
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
    imports: [AltButton],
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

const tagName = AltCoreButtonTagName

// Unit tests cases:
const propLabelTestCases: TPropTestCase<IAltNgButtonProps, 'label'>[] = [
  {
    prop: 'label',
    case: 'with a value',
    value: text,
    expected: text,
  },
  {
    prop: 'label',
    case: 'without a value',
    value: undefined,
    expected: defaultLabel,
  },
]
const propIconLeftTestCases: TPropTestCase<IAltNgButtonProps, 'iconLeft'>[] = [
  {
    prop: 'iconLeft',
    case: 'with a value',
    value: altRocket,
    expected: altRocket,
  },
  {
    prop: 'iconLeft',
    case: 'without a value',
    value: undefined,
    expected: defaultIconLeft,
  },
]
const propIconRightTestCases: TPropTestCase<IAltNgButtonProps, 'iconRight'>[] = [
  {
    prop: 'iconRight',
    case: 'with a value',
    value: altRocket,
    expected: altRocket,
  },
  {
    prop: 'iconRight',
    case: 'without a value',
    value: undefined,
    expected: defaultIconRight,
  },
]

const fullWidthTestCases: TPropTestCase<IAltNgButtonProps, 'fullWidth'>[] = [
  {
    prop: 'fullWidth',
    case: 'true',
    value: true,
    expected: '', // Boolean attributes: true -> empty string (attribute present)
  },
  {
    prop: 'fullWidth',
    case: 'false',
    value: false,
    expected: null, // false -> attribute absent (null)
  },
  {
    prop: 'fullWidth',
    case: 'without a value (default)',
    value: undefined,
    expected: defaultFullWidth ? '' : null, // depends on the default value
  },
]

describe(
  'Angular/AltButton',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of propLabelTestCases) {
          it(
            `Prop "${testCase.prop}" should set ${testCase.prop} on the core component to "${testCase.case}"`,
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
            `Prop "${testCase.prop}" should set ${testCase.prop} on the core component to "${testCase.case}"`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

              expect(coreElement?.[testCase.prop]?.name).toBe((testCase.expected as Partial<IAltIcon> | undefined)?.name)
            },
          )
        }

        for (const testCase of fullWidthTestCases) {
          it(
            `Prop "fullWidth" should set the full-width attribute on the core component to "${testCase.case}"`,
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
