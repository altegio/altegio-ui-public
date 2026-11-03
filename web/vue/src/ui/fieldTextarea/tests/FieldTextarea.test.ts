import { describe, expect, it, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'

import { AltCoreFieldTextareaTagName } from '~shared/constants'

import { AltFieldTextarea } from '~vue/ui/fieldTextarea'
import { AltCoreFieldTextarea } from '~core/ui/fieldTextarea'

const tagName = AltCoreFieldTextareaTagName

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
  'Vue/AltFieldTextarea',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreFieldTextarea,
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
                `Prop "${testCase.prop}" should set ${testCase.prop} on the core component`,
                () => {
                  const wrapper = mount(
                    AltFieldTextarea,
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
                `Prop "${testCase.prop}" should set ${testCase.prop} on the core component`,
                () => {
                  const wrapper = mount(
                    AltFieldTextarea,
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
