import { describe, expect, it, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'

import { YCoreFieldTextareaTagName } from '~shared/constants'

import { YFieldTextarea } from '~vue/ui/fieldTextarea'
import { YCoreFieldTextarea } from '~core/ui/fieldTextarea'

const tagName = YCoreFieldTextareaTagName

import {
  propDisabledCases,
  propSizeCases,
  propReadonlyCases,
  propModelValueCases,
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

describe(
  'Vue/YFieldTextarea',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreFieldTextarea,
        )
      }
    })

    describe(
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            for (const testCase of [...propModelValueCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
                () => {
                  const wrapper = mount(
                    YFieldTextarea,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreElement = wrapper.find(tagName).element

                  expect(coreElement.value).toBe(testCase.expected)
                },
              )
            }
            for (const testCase of [
              ...propDisabledCases,
              ...propSizeCases,
              ...propReadonlyCases,
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
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
                () => {
                  const wrapper = mount(
                    YFieldTextarea,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreElement = wrapper.find(tagName).element

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
