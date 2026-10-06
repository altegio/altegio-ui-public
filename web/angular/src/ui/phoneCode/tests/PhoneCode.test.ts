import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCorePhoneCodeTagName } from '~shared/constants'
import { YPhoneCode } from '~ng/ui/phoneCode'
import {
  type IYNgPhoneCodeProps,
} from '~ng/ui/phoneCode/models/types'
import {
  propCodeTestCases,
  propDisabledTestCases,
  propSizeTestCases,
} from './cases/props'

const tagName = YCorePhoneCodeTagName

interface ICreateComponentArgs {
  props?: Partial<IYNgPhoneCodeProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YPhoneCode] }).compileComponents()

  @Component({
    template: '<YPhoneCode [code]="code" [disabled]="disabled" [readonly]="readonly" [size]="size"></YPhoneCode>',
    imports: [YPhoneCode],
    standalone: true,
  })
  class TestComponent {
    code = props?.code
    disabled = props?.disabled
    size = props?.size
  }
  return TestComponent
}

describe('Angular/YPhoneCode', () => {
  describe('Unit', () => {
    describe('Props', () => {
      for (const testCase of [
        ...propCodeTestCases,
        ...propDisabledTestCases,
        ...propSizeTestCases,
      ]) {
        it(`Prop "${testCase.prop}" должен быть ${testCase.case}`, async() => {
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
