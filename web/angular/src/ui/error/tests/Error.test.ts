import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { text } from '~shared/tests/slotContents'
import { AltCoreErrorTagName } from '~shared/constants'
import { AltError } from '~ng/ui/error'

import {
  type IAltNgErrorProps,
} from '~ng/ui/error/models/types'

interface ICreateComponentArgs {
  props?: Partial<IAltNgErrorProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltError] }).compileComponents()

  @Component({
    template: '<AltError [errors]="errors" />',
    imports: [AltError],
    standalone: true,
  })
  class TestComponent {
    errors = props?.errors
  }
  return TestComponent
}

const tagName = AltCoreErrorTagName

describe(
  'Angular/AltError',
  () => {
    describe(
      'Props',
      () => {
        it(
          'Should update the errors prop of the core error',
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
