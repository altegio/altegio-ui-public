import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { YBrandButton } from '~vue/ui/brandButton'
import { YCoreBrandButton } from '~core/ui/brandButton'
import { YCoreBrandButtonTagName as tagName } from '~shared/constants'
import {
  propSizeTestCases,
  propVariantTestCases,
  propDisabledTestCases,
  propTextTestCases,
} from './cases/props'

describe('Vue/YBrandButton', () => {
  beforeAll(() => {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, YCoreBrandButton)
    }
  })

  describe('Props', () => {
    for (const testCase of [
      ...propSizeTestCases,
      ...propVariantTestCases,
      ...propDisabledTestCases,
      ...propTextTestCases,
    ]) {
      it(`Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`, () => {
        const wrapper = mount(YBrandButton, { props: { [testCase.prop]: testCase.value } })

        const coreElement = wrapper.find(tagName)
        expect(coreElement.element[testCase.prop]).toBe(testCase.expected)
      })
    }
  })

  describe('Events', () => {
    const eventTestCases = [{ eventName: 'click', emitEventName: 'click', case: 'при клике' }]

    for (const { eventName, emitEventName, case: eventCase } of eventTestCases) {
      it(`Должен вызывать событие "${emitEventName}" ${eventCase}`, async() => {
        const wrapper = mount(YBrandButton, { props: { text: 'DEFAULT' } })

        const coreElement = wrapper.find(tagName)
        await coreElement.trigger(eventName)

        expect(wrapper.emitted()).toHaveProperty(emitEventName)
      })
    }
  })
})
