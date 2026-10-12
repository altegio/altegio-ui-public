import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { YCoreTextFieldTagName } from '~shared/constants'
import { YCoreTextField } from '~core/index'
import { YSearchField } from '~vue/ui/searchField'
// import type { IYCoreFieldInputInputEvent } from '~core/ui/textField/models/types'

// import { eventsVueCases } from './cases/events'
import { propSizeTestCases, propDisabledTestCases, propLabelTextTestCases, propLabelTooltipTextTestCases, propLabelDebounceTestCases, propErrorsTestCases, propAutofocusTestCases, propErrorTestCases, propNameTestCases, propPlaceholderTestCases, propModelValueTestCases } from './cases/props'

describe(
  'Vue/YSearchField',
  () => {
    beforeAll(() => {
      if (!customElements.get(YCoreTextFieldTagName)) {
        customElements.define(
          YCoreTextFieldTagName,
          YCoreTextField,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of [...propModelValueTestCases]) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            () => {
              const wrapper = mount(
                YSearchField,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(YCoreTextFieldTagName)

              expect(coreElement.element.value).toBe(testCase.expected)
            },
          )
        }
        for (const testCase of [
          ...propNameTestCases,
          ...propPlaceholderTestCases,
          ...propAutofocusTestCases,
          ...propDisabledTestCases,
          ...propLabelTextTestCases,
          ...propLabelTooltipTextTestCases,
          ...propLabelDebounceTestCases,
          ...propErrorTestCases,
          ...propErrorsTestCases,
          ...propSizeTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            () => {
              const wrapper = mount(
                YSearchField,
                {
                  props: {
                    modelValue: '',
                    [testCase.prop]: testCase.value,
                  },
                },
              )

              const coreElement = wrapper.find(YCoreTextFieldTagName)

              if (Array.isArray(testCase.value)) {
                expect(coreElement.element[testCase.prop]).toStrictEqual(testCase.expected)
              } else {
                expect(coreElement.element[testCase.prop]).toBe(testCase.expected)
              }
            },
          )
        }
      },
    )

    // TODO: Написать тесты для событий
    // describe(
    //   'Events',
    //   () => {
    //     for (const { emitName, event, payload, case: eventCase } of eventsVueCases) {
    //       it.skip(
    //         `Должен вызывать событие "${emitName}" ${eventCase}`,
    //         () => {
    //           const wrapper = mount(
    //             YSearchField,
    //             { props: { modelValue: '' } },
    //           )

    //           const coreInput = wrapper.find(tagName).element
    //           coreInput.dispatchEvent(event)

    //           expect(wrapper.emitted()).toHaveProperty(emitName)
    //           expect(JSON.stringify((wrapper.emitted(emitName)?.[0][0] as CustomEvent<IYCoreFieldInputInputEvent>).detail)).toEqual(JSON.stringify(payload))
    //         },
    //       )

    //       it.skip(
    //         `Не должен вызывать событие "${emitName}" ${eventCase} если компонент disabled`,
    //         () => {
    //           const wrapper = mount(
    //             YSearchField,
    //             { props: { modelValue: '', disabled: true } },
    //           )

    //           const coreInput = wrapper.find(tagName).element
    //           coreInput.dispatchEvent(event)

    //           expect(wrapper.emitted()).not.toHaveProperty(emitName)
    //         },
    //       )
    //     }
    //   },
    // )
  },
)
