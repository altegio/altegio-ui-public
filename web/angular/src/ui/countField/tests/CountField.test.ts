import { describe, expect, it, vi } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreCountFieldTagName } from '~shared/constants'
import { YCountField } from '~ng/ui/countField'
import type { IYNgCountFieldProps } from '~ng/ui/countField/models/types'
import type { YCoreCountField } from '~core/ui/countField'
import { FocusEvent, BlurEvent } from '~core/ui/fieldWrapper/models/types'
import { KeydownEvent } from '~core/ui/fieldInput/models/types'
import {
  propMaxTestCases,
  propMinTestCases,
  propRequiredTestCases,
  propSizeTestCases,
  propErrorTestCases,
  propPlaceholderTestCases,
  propAutofocusTestCases,
  propLabelTextTestCases,
  propLabelTooltipTextTestCases,
  propLabelDebounceTestCases,
  propAnnotationTextTestCases,
  propErrorsTestCases,
  propNameTestCases,
  propDisabledTestCases,
} from '~ng/ui/countField/tests/cases/props'

const tagName = YCoreCountFieldTagName

interface ICreateComponentArgs {
  props?: Partial<IYNgCountFieldProps>
}
const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YCountField] }).compileComponents()

  @Component({
    template: `<YCountField
      [min]="min"
      [max]="max"
      [size]="size"
      [disabled]="disabled"
      [readonly]="readonly"
      [required]="required"
      [error]="error"
      [placeholder]="placeholder"
      [autofocus]="autofocus"
      [labelText]="labelText"
      [labelTooltipText]="labelTooltipText"
      [labelDebounce]="labelDebounce"
      [annotationText]="annotationText"
      [errors]="errors"
      [name]="name"
    ></YCountField>`,
    imports: [YCountField],
    standalone: true,
  })

  class TestComponent {
    min = props?.min
    max = props?.max
    size = props?.size
    disabled = props?.disabled
    readonly = props?.readonly
    required = props?.required
    error = props?.error
    placeholder = props?.placeholder
    autofocus = props?.autofocus
    labelText = props?.labelText
    labelTooltipText = props?.labelTooltipText
    labelDebounce = props?.labelDebounce
    annotationText = props?.annotationText
    errors = props?.errors
    name = props?.name
  }

  return TestComponent
}

describe(
  'Angular/YCountField',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propMinTestCases,
              ...propMaxTestCases,
              ...propSizeTestCases,
              ...propDisabledTestCases,
              ...propRequiredTestCases,
              ...propErrorTestCases,
              ...propPlaceholderTestCases,
              ...propAutofocusTestCases,
              ...propLabelTextTestCases,
              ...propLabelTooltipTextTestCases,
              ...propLabelDebounceTestCases,
              ...propAnnotationTextTestCases,
              ...propErrorsTestCases,
              ...propNameTestCases,
            ]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
                async() => {
                  const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)!
                  const value = coreElement[testCase.prop as keyof YCoreCountField]

                  if (Array.isArray(value) || typeof value === 'object' && value !== null) {
                    expect(value).toStrictEqual(testCase.value)
                  } else {
                    expect(value).toBe(testCase.value)
                  }
                },
              )
            }
          },
        )

        describe(
          'Events',
          () => {
            it(
              'Должен вызывать событие focus при фокусе',
              async() => {
                const component = await createComponent({})
                const fixture = TestBed.createComponent(component)
                fixture.detectChanges()

                await fixture.whenStable()

                const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)!
                const focusHandler = vi.fn()

                coreElement.addEventListener('focus', focusHandler)
                const focusEvent = new FocusEvent('focus', { detail: { event: new Event('focus') } })
                coreElement.dispatchEvent(focusEvent)

                expect(focusHandler).toHaveBeenCalledTimes(1)
              },
            )

            it(
              'Должен вызывать событие blur при потере фокуса',
              async() => {
                const component = await createComponent({})
                const fixture = TestBed.createComponent(component)
                fixture.detectChanges()

                await fixture.whenStable()

                const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)!
                const blurHandler = vi.fn()

                coreElement.addEventListener('blur', blurHandler)
                const blurEvent = new BlurEvent('blur', { detail: { event: new Event('blur') } })
                coreElement.dispatchEvent(blurEvent)

                expect(blurHandler).toHaveBeenCalledTimes(1)
              },
            )

            it(
              'Должен вызывать событие keydown при нажатии клавиши',
              async() => {
                const component = await createComponent({})
                const fixture = TestBed.createComponent(component)
                fixture.detectChanges()

                await fixture.whenStable()

                const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)!
                const keydownHandler = vi.fn()

                coreElement.addEventListener('keydown', keydownHandler)
                const keydownEvent = new KeydownEvent('keydown', { detail: { event: new KeyboardEvent('keydown', { code: 'ChevronUp' }), code: 'ChevronUp' } })
                coreElement.dispatchEvent(keydownEvent)

                expect(keydownHandler).toHaveBeenCalledTimes(1)
                expect(keydownEvent.detail.code).toBe('ChevronUp')
              },
            )
          },
        )
      },
    )
  },
)
