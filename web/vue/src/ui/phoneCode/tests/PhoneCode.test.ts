import { describe, expect, it, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'

import { AltCorePhoneCodeTagName } from '~shared/constants'

import { AltPhoneCode } from '~vue/ui/phoneCode'
import {
  type IAltVuePhoneCodeProps,
} from '~vue/ui/phoneCode/models/types'
import { AltCorePhoneCode } from '~core/ui/phoneCode'
import {
  propCodeTestCases,
  propDisabledTestCases,
  propReadonlyTestCases,
  propSizeTestCases,
} from './cases/props'

const tagName = AltCorePhoneCodeTagName

interface ICreateComponentArgs {
  props?: Partial<IAltVuePhoneCodeProps>
}

const createComponent = ({ props }: ICreateComponentArgs) => mount(AltPhoneCode, { props })

describe('Vue/AltPhoneCode', () => {
  beforeAll(() => {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, AltCorePhoneCode)
    }
  })

  describe('Unit', () => {
    describe('Props', () => {
      for (const testCase of [
        ...propCodeTestCases,
        ...propDisabledTestCases,
        ...propReadonlyTestCases,
        ...propSizeTestCases,
      ]) {
        it(`Prop "${testCase.prop}" ${testCase.case} should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`, () => {
          const wrapper = createComponent({ props: { [testCase.prop]: testCase.value } })

          const coreElement = wrapper.find(tagName)
          expect(coreElement.exists()).toBe(true)
          expect(coreElement.element[testCase.prop]).toBe(testCase.expected)
        })
      }
    })
  })
})
