import { describe, expect, it, vi } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreFieldInputTagName } from '~shared/constants'
import { AltFieldInput } from '~ng/ui/fieldInput/FieldInput.component'
import {
  type IAltNgFieldInputProps,
} from '~ng/ui/fieldInput/models/types'
import {
  propAutocompleteTestCases,
  propAutofocusTestCases,
  propDisabledTestCases, propHideSpaceLeftTestCases, propHideSpaceRightTestCases, propMaxlengthTestCases,
  propNameTestCases, propPlaceholderTestCases,
  propReadonlyTestCases, propRequiredTestCases,
  propSizeTestCases, propTypeTestCases, propValueTestCases,
} from '~ng/ui/fieldInput/tests/cases/props'
import { ngInputEvents } from '~ng/ui/fieldInput/tests/cases/events'
import { dispatchEvent } from '~shared/tests/utils'

const tagName = AltCoreFieldInputTagName

interface ICreateComponentArgs {
  slots?: {
    default?: string
  }
  props?: Partial<IAltNgFieldInputProps>
}
const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltFieldInput] }).compileComponents()

  @Component({
    template: `
      <AltFieldInput
        [disabled]="disabled"
        [size]="size"
        [readonly]="readonly"
        [value]="value"
        [name]="name"
        [type]="type"
        [placeholder]="placeholder"
        [required]="required"
        [maxlength]="maxlength"
        [autofocus]="autofocus"
        [hideSpaceLeft]="hideSpaceLeft"
        [hideSpaceRight]="hideSpaceRight"
        [autocomplete]="autocomplete"
        (input)="onInput($event)"
        (focus)="onFocus($event)"
        (blur)="onBlur($event)"
        (keydown)="onKeydown($event)"
        (render)="onRender($event)"
      ></AltFieldInput>`,
    imports: [AltFieldInput],
    standalone: true,
  })
  class TestComponent {
    disabled = props?.disabled
    size = props?.size
    readonly = props?.readonly
    value = props?.value
    name = props?.name
    type = props?.type
    placeholder = props?.placeholder
    required = props?.required
    maxlength = props?.maxlength
    autofocus = props?.autofocus
    hideSpaceLeft = props?.hideSpaceLeft
    hideSpaceRight = props?.hideSpaceRight
    autocomplete = props?.autocomplete

    onFocus = vi.fn()
    onBlur = vi.fn()
    onInput = vi.fn()
    onKeydown = vi.fn()
    onRender = vi.fn()
  }
  return TestComponent
}

describe(
  'Angular/AltFieldInput',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propDisabledTestCases,
              ...propReadonlyTestCases,
              ...propSizeTestCases,
              ...propNameTestCases,
              ...propPlaceholderTestCases,
              ...propAutofocusTestCases,
              ...propRequiredTestCases,
              ...propTypeTestCases,
              ...propMaxlengthTestCases,
              ...propHideSpaceLeftTestCases,
              ...propHideSpaceRightTestCases,
              ...propAutocompleteTestCases,
              ...propValueTestCases,
            ]) {
              it(
                `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
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

        describe(
          'Events',
          () => {
            for (const { eventName, case: eventCase } of ngInputEvents) {
              it(
                `Should emit "${eventName}" ${eventCase}`,
                async() => {
                  const handleAction = vi.fn()
                  const component = await createComponent({ props: {} })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()
                  const coreInput = (fixture.nativeElement as HTMLElement).querySelector(tagName) as HTMLElement

                  coreInput.addEventListener(
                    eventName,
                    handleAction,
                  )

                  dispatchEvent(
                    coreInput,
                    eventName,
                    {
                      bubbles: true,
                      cancelable: true,
                    },
                  )

                  expect(handleAction).toHaveBeenCalled()
                },
              )
            }
          },
        )
      },
    )
  },
)
