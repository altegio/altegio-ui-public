import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreFieldTextareaTagName } from '~shared/constants'
import { AltFieldTextarea } from '~ng/ui/fieldTextarea'
import {
  type IAltNgFieldTextareaProps,
} from '~ng/ui/fieldTextarea/models/types'

import {
  propDisabledCases,
  propSizeCases,
  propValueCases,
  propNameCases,
  propPlaceholderCases,
  propRequiredCases,
  propMaxlengthCases,
  propAutofocusCases,
  propRowsCases,
  propResizeCases,
  propHideSpaceLeftCases,
  propHideSpaceRightCases,
  propAutocompleteCases,
} from './cases/props'

const tagName = AltCoreFieldTextareaTagName

interface ICreateComponentArgs {
  props?: Partial<IAltNgFieldTextareaProps>
}
const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltFieldTextarea] }).compileComponents()

  @Component({
    template: `
      <AltFieldTextarea
        [disabled]="disabled"
        [size]="size"
        [value]="value"
        [name]="name"
        [placeholder]="placeholder"
        [maxlength]="maxlength"
        [autofocus]="autofocus"
        [hideSpaceLeft]="hideSpaceLeft"
        [hideSpaceRight]="hideSpaceRight"
        [required]="required"
        [rows]="rows"
        [resize]="resize"
        [autocomplete]="autocomplete"
      ></AltFieldTextarea>`,
    imports: [AltFieldTextarea],
    standalone: true,
  })
  class TestComponent {
    disabled = props?.disabled
    size = props?.size
    value = props?.value ?? ''
    name = props?.name
    placeholder = props?.placeholder
    maxlength = props?.maxlength
    autofocus = props?.autofocus ?? false
    hideSpaceLeft = props?.hideSpaceLeft
    hideSpaceRight = props?.hideSpaceRight
    required = props?.required
    rows = props?.rows
    resize = props?.resize
    autocomplete = props?.autocomplete
  }
  return TestComponent
}

describe(
  'Angular/AltFieldTextarea',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propDisabledCases,
              ...propSizeCases,
              ...propValueCases,
              ...propNameCases,
              ...propPlaceholderCases,
              ...propRequiredCases,
              ...propMaxlengthCases,
              ...propAutofocusCases,
              ...propRowsCases,
              ...propResizeCases,
              ...propHideSpaceLeftCases,
              ...propHideSpaceRightCases,
              ...propAutocompleteCases,
            ]) {
              it(
                `Prop "${testCase.prop}" should change ${testCase.prop} on the core component from ${String(testCase.value)} to ${String(testCase.expected)}`,
                async() => {
                  const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

                  if (!coreElement) {
                    throw new Error('coreElement not found')
                  }

                  expect(coreElement[testCase.prop]).toBe(testCase.expected)
                },
              )
            }
          },
        )
      },
    )
  },
)
