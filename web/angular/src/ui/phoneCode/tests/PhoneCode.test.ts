import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCorePhoneCodeTagName } from '~shared/constants'
import { AltPhoneCode } from '~ng/ui/phoneCode'
import {
  type IAltNgPhoneCodeProps,
} from '~ng/ui/phoneCode/models/types'
import {
  propCodeTestCases,
  propDisabledTestCases,
  propSizeTestCases,
} from './cases/props'

const tagName = AltCorePhoneCodeTagName

interface ICreateComponentArgs {
  props?: Partial<IAltNgPhoneCodeProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltPhoneCode] }).compileComponents()

  @Component({
    template: '<AltPhoneCode [code]="code" [disabled]="disabled" [readonly]="readonly" [size]="size"></AltPhoneCode>',
    imports: [AltPhoneCode],
    standalone: true,
  })
  class TestComponent {
    code = props?.code
    disabled = props?.disabled
    size = props?.size
  }
  return TestComponent
}

describe('Angular/AltPhoneCode', () => {
  describe('Unit', () => {
    describe('Props', () => {
      for (const testCase of [
        ...propCodeTestCases,
        ...propDisabledTestCases,
        ...propSizeTestCases,
      ]) {
        it(`Prop "${testCase.prop}" should work ${testCase.case}`, async() => {
          const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
          const fixture = TestBed.createComponent(component)
          fixture.detectChanges()

          await fixture.whenStable()

          const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
          expect(coreElement?.[testCase.prop]).toBe(testCase.value)
        })
      }
    })
  })
})
