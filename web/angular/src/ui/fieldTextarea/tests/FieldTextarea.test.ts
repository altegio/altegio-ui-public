import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreFieldTextareaTagName } from '~shared/constants'
import { YFieldTextarea } from '~ng/ui/fieldTextarea'
import {
  type IYNgFieldTextareaProps,
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

const tagName = YCoreFieldTextareaTagName

interface ICreateComponentArgs {
  props?: Partial<IYNgFieldTextareaProps>
}
const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YFieldTextarea] }).compileComponents()

  @Component({
    template: `
      <YFieldTextarea
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
      ></YFieldTextarea>`,
    imports: [YFieldTextarea],
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
  'Angular/YFieldTextarea',
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
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента c ${String(testCase.value)} на ${String(testCase.expected)}`,
                async() => {
                  const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

                  if (!coreElement) {
                    throw new Error('coreElement не найден')
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
