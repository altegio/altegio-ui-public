import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { text } from '~shared/tests/slotContents'
import { YCoreErrorTagName } from '~shared/constants'
import { YError } from '~ng/ui/error'

import {
  type IYNgErrorProps,
} from '~ng/ui/error/models/types'

interface ICreateComponentArgs {
  props?: Partial<IYNgErrorProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YError] }).compileComponents()

  @Component({
    template: '<YError [errors]="errors" />',
    imports: [YError],
    standalone: true,
  })
  class TestComponent {
    errors = props?.errors
  }
  return TestComponent
}

const tagName = YCoreErrorTagName

describe(
  'Angular/YError',
  () => {
    describe(
      'Props',
      () => {
        it(
          'Должен корректно изменить errors prop у core error',
          async() => {
            const errors = [text]
            const component = await createComponent({ props: { errors } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            expect(coreElement?.errors?.[0]).toBe(errors[0])
          },
        )
      },
    )
  },
)
