import { describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { href } from '~shared/tests/mockData'
import { AltCoreSimpleButtonTagName } from '~shared/constants'
import type { TPropTestCase, TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'
import { EAnchorTarget, EAltSizes } from '~shared/types/global'
import { createCoreSimpleButtonExternalProps, EAltCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'
import { type IAltNgSimpleButtonProps } from '~ng/ui/simpleButton/models/types'
import { AltSimpleButton } from '~ng/ui/simpleButton'

interface ICreateComponentArgs {
  slots?: {
    default?: string
  }
  props?: Partial<IAltNgSimpleButtonProps>
}

const {
  size: defaultSize,
  variant: defaultVariant,
  disabled: defaultDisabled,
  loading: defaultLoading,
  href: defaultHref,
  target: defaultTarget,
} = createCoreSimpleButtonExternalProps()

const createComponent = async({ slots, props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltSimpleButton] }).compileComponents()

  @Component({
    template: `
      <AltSimpleButton
        [size]="size"
        [variant]="variant"
        [disabled]="disabled"
        [loading]="loading"
        [href]="href"
        [target]="target"
      >{{content}}</AltSimpleButton>`,
    imports: [AltSimpleButton],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  class TestComponent {
    size = props?.size
    variant = props?.variant
    disabled = props?.disabled
    loading = props?.loading
    href = props?.href
    target = props?.target
    content = slots?.default || ''
  }
  return TestComponent
}

const tagName = AltCoreSimpleButtonTagName

// Unit test cases:
const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'default', case: 'with content', content: text },
  { slot: 'default', case: 'without content', content: empty },
]
const propSizeTestCases: TPropTestCase<IAltNgSimpleButtonProps, 'size'>[] = [
  {
    prop: 'size',
    case: 'with a value',
    value: EAltSizes.MEDIUM,
    expected: EAltSizes.MEDIUM,
  },
  {
    prop: 'size',
    case: 'without a value',
    value: undefined,
    expected: defaultSize,
  },
]
const propVariantTestCases: TPropTestCase<IAltNgSimpleButtonProps, 'variant'>[] = [
  {
    prop: 'variant',
    case: 'with a value',
    value: EAltCoreSimpleButtonVariant.OUTLINE,
    expected: EAltCoreSimpleButtonVariant.OUTLINE,
  },
  {
    prop: 'variant',
    case: 'without a value',
    value: undefined,
    expected: defaultVariant,
  },
]
const propDisabledTestCases: TPropTestCase<IAltNgSimpleButtonProps, 'disabled'>[] = [
  {
    prop: 'disabled',
    case: 'with a value',
    value: true,
    expected: true,
  },
  {
    prop: 'disabled',
    case: 'without a value',
    value: undefined,
    expected: defaultDisabled,
  },
]
const propLoadingTestCases: TPropTestCase<IAltNgSimpleButtonProps, 'loading'>[] = [
  {
    prop: 'loading',
    case: 'with a value',
    value: true,
    expected: true,
  },
  {
    prop: 'loading',
    case: 'without a value',
    value: undefined,
    expected: defaultLoading,
  },
]
const propHrefTestCases: TPropTestCase<IAltNgSimpleButtonProps, 'href'>[] = [
  {
    prop: 'href',
    case: 'with a value',
    value: href,
    expected: href,
  },
  {
    prop: 'href',
    case: 'without a value',
    value: undefined,
    expected: defaultHref,
  },
]
const propTargetTestCases: TPropTestCase<IAltNgSimpleButtonProps, 'target'>[] = [
  {
    prop: 'target',
    case: 'with a value',
    value: EAnchorTarget.BLANK,
    expected: EAnchorTarget.BLANK,
  },
  {
    prop: 'target',
    case: 'without a value',
    value: undefined,
    expected: defaultTarget,
  },
]

describe(
  'Angular/AltSimpleButton',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propSizeTestCases,
          ...propVariantTestCases,
          ...propDisabledTestCases,
          ...propLoadingTestCases,
          ...propHrefTestCases,
          ...propTargetTestCases,
        ]) {
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
      },
    )

    describe(
      'Slots',
      () => {
        for (const testCase of slotDefaultTestCases) {
          it(
            `Slot "${testCase.slot}" should render ${testCase.case}`,
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
      'Events',
      () => {
        it(
          'Should emit click when the button is pressed',
          async() => {
            const handleClick = vi.fn()

            const component = await createComponent({
              slots: {},
              props: {},
            })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

            if (!coreElement) throw new Error('Button element not found')
            coreElement.onclick = handleClick

            await userEvent.click(coreElement)
            await fixture.whenStable()

            expect(handleClick).toHaveBeenCalledTimes(1)
          },
        )

        it(
          'Should not emit click when the button is disabled',
          async() => {
            const handleClick = vi.fn()

            const component = await createComponent({ props: { disabled: true } })

            const fixture = TestBed.createComponent(component)

            fixture.detectChanges()
            const element = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            if (!element) throw new Error('Button element not found')

            const nativeElement = fixture.nativeElement as HTMLElement
            const coreElement = nativeElement.querySelector(tagName)

            if (!coreElement) throw new Error('Button element not found')
            coreElement.onclick = handleClick

            await userEvent.click(coreElement)

            expect(handleClick).not.toHaveBeenCalled()
          },
        )
      },
    )
  },
)
