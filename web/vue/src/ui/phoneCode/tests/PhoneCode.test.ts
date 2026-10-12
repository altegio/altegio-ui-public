import { describe, expect, it, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'

import { YCorePhoneCodeTagName } from '~shared/constants'

import { YPhoneCode } from '~vue/ui/phoneCode'
import {
  type IYVuePhoneCodeProps,
} from '~vue/ui/phoneCode/models/types'
import { YCorePhoneCode } from '~core/ui/phoneCode'
import {
  propCodeTestCases,
  propDisabledTestCases,
  propReadonlyTestCases,
  propSizeTestCases,
} from './cases/props'

const tagName = YCorePhoneCodeTagName

interface ICreateComponentArgs {
  props?: Partial<IYVuePhoneCodeProps>
}

const createComponent = ({ props }: ICreateComponentArgs) => mount(YPhoneCode, { props })

describe('Vue/YPhoneCode', () => {
  beforeAll(() => {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, YCorePhoneCode)
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
        it(`Prop "${testCase.prop}" ${testCase.case} должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`, () => {
          const wrapper = createComponent({ props: { [testCase.prop]: testCase.value } })

          const coreElement = wrapper.find(tagName)
          expect(coreElement.exists()).toBe(true)
          expect(coreElement.element[testCase.prop]).toBe(testCase.expected)
        })
      }
    })
  })
})
