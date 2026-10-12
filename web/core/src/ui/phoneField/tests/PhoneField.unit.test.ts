import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

import {
  YCoreErrorTagName,
  YCoreFieldInputTagName,
  YCorePhoneFieldTagName,
  YCoreDropdownCellTagName,
  YCoreAnnotationTagName,
  YCoreDropdownListTagName,
  YCorePhoneCodeTagName,
  YCoreFieldWrapperTagName,
  YCoreLabelTagName,
} from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot } from '~shared/tests/utils'
import '~core/ui/phoneField'
import type {
  TYCorePhoneFieldAutocompleteOption,
  TYCorePhoneFieldInfoWithMeta,
} from '~core/ui/phoneField/models/types'
import {
  createCorePhoneFieldProps,
} from '~core/ui/phoneField/models/types'
import { wrapperEvents, fieldEvents } from '~core/ui/phoneField/tests/cases/events'
import { userEvent } from '@vitest/browser/context'
import { searchNumberValue, text, textWithTag } from '~shared/tests/slotContents'
import {
  autocompleteOptions,
  propAnnotationTextCases,
  propAutofocusCases, propDefaultCountryIdCases,
  propDisabledAutocompleteCases,
  propDisabledCases,
  propErrorsCases,
  propLabelTextCases,
  propLabelTooltipTextCases, propMinSearchLengthCases,
  propNameCases,
  propPlaceholderCases,
  propReadonlyCases,
  propRequiredCases, propSearchFunctionCases,
  propSizeCases,
  propValueCases, propWithoutCodeSelectionCases, searchFunction,
} from '~core/ui/phoneField/tests/cases/props'
import { defaultCountriesData } from '~shared/utils/countries'

const tagName = YCorePhoneFieldTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCorePhoneFieldProps(),
)

type TSubComponent = typeof YCoreFieldInputTagName | typeof YCoreAnnotationTagName | typeof YCoreErrorTagName | typeof YCoreDropdownListTagName | typeof YCoreDropdownCellTagName | typeof YCorePhoneCodeTagName | typeof YCoreFieldWrapperTagName | typeof YCoreLabelTagName

const getSubWC = <T extends TSubComponent>(primaryWC: HTMLElement, secondaryWC: T) => {
  const subWC = getWCShadowRoot(primaryWC).querySelector(secondaryWC)
  if (!subWC) throw new Error(`${secondaryWC} not found`)
  return subWC
}

const callHandleInputEvent = async(searchPhone = searchNumberValue) => {
  vi.useFakeTimers()

  const inputField = getSubWC(
    component,
    YCoreFieldInputTagName,
  )

  const fieldInputEvent = new CustomEvent(
    'input',
    { detail: { value: searchPhone } },
  )

  inputField.dispatchEvent(fieldInputEvent)

  await vi.advanceTimersByTimeAsync(1500)
}

describe(
  'Core/YCorePhoneField/Unit',
  () => {
    beforeAll(() => {
      injectComponentToBody()
    })

    afterEach(async() => {
      await resetComponent()
      component.changeDropdownVisible(false)
    })

    afterAll(() => {
      removeComponent()
    })

    describe(
      'Slots',
      () => {
        it(
          'Должен отрендерить слот "annotation" в annotation',
          async() => {
            await updateComponent({ slots: { ['annotation']: textWithTag } })

            const slotContent = component.querySelector('div[slot="annotation"]')
            expect(slotContent?.innerHTML).toBe(textWithTag)
          },
        )

        it(
          'Должен отрендерить слот "list" в dropdownList',
          async() => {
            await updateComponent({ slots: { ['list']: textWithTag }, props: { searchFunction } })

            await callHandleInputEvent()

            const slotContent = component.querySelector('div[slot="list"]')
            expect(slotContent?.innerHTML).toBe(textWithTag)
          },
        )
      },
    )

    describe(
      'Props',
      () => {
        for (const { prop, case: propCase, value } of [
          ...propValueCases,
          ...propNameCases,
          ...propPlaceholderCases,
          ...propAutofocusCases,
          ...propRequiredCases,
        ]) {
          it(
            `Проп "${prop}" должен быть "${propCase}" и передан в fieldInput`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              const inputField = getSubWC(
                component,
                YCoreFieldInputTagName,
              )

              expect(inputField[prop]).toBe(value)
            },
          )
        }

        for (const { prop, case: propCase, value } of [
          ...propReadonlyCases,
          ...propSizeCases,
        ]) {
          it(
            `Проп "${prop}" должен быть "${propCase}" и передан в fieldWrapper`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              const inputField = getSubWC(
                component,
                YCoreFieldWrapperTagName,
              )

              expect(inputField[prop]).toBe(value)
            },
          )
        }

        for (const { prop, labelProp, case: propCase, value } of [...propLabelTextCases]) {
          it(
            `Проп "${prop}" должен быть "${propCase}" и передан в label`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              if (value) {
                const labelElement = getSubWC(
                  component,
                  YCoreLabelTagName,
                )
                expect(labelElement[labelProp]).toBe(value)
              } else {
                expect(() => getSubWC(
                  component,
                  YCoreLabelTagName,
                )).toThrow(`${YCoreLabelTagName} not found`)
              }
            },
          )
        }

        for (const { prop, case: propCase, value, labelProp } of [...propLabelTooltipTextCases]) {
          it(
            `Проп "${prop}" должен быть "${propCase}" и передан в label`,
            async() => {
              await updateComponent({
                props: {
                  [prop]: value,
                  labelText: text,
                },
              })

              const labelElement = getSubWC(
                component,
                YCoreLabelTagName,
              )

              expect(labelElement[labelProp]).toBe(value)
            },
          )
        }

        for (const { prop, case: propCase, value } of propDisabledCases) {
          it(
            `Проп "${prop}" должен быть "${propCase}" и передан в fieldWrapper, annotation и label`,
            async() => {
              await updateComponent({ props: { [prop]: value, annotationText: text, labelText: text } })

              const inputFieldElement = getSubWC(
                component,
                YCoreFieldInputTagName,
              )

              const annotationElement = getSubWC(
                component,
                YCoreAnnotationTagName,
              )

              const labelElement = getSubWC(
                component,
                YCoreLabelTagName,
              )

              expect(labelElement.disabled).toBe(value)
              expect(inputFieldElement.disabled).toBe(value)
              expect(annotationElement.disabled).toBe(value)
            },
          )
        }

        for (const { prop, case: propCase, value } of propErrorsCases) {
          it(
            `Проп "${prop}" должен быть "${propCase}" и передан в error`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              if (value?.length) {
                const errorElement = getSubWC(
                  component,
                  YCoreErrorTagName,
                )
                expect(errorElement.errors).toBe(value)
              } else {
                expect(() => getSubWC(
                  component,
                  YCoreErrorTagName,
                )).toThrow(`${YCoreErrorTagName} not found`)
              }
            },
          )
        }

        for (const { prop, case: propCase, value, annotationProp } of propAnnotationTextCases) {
          it(
            `Проп "${prop}" должен быть "${propCase}" и передан в annotation`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              const annotationElement = getSubWC(
                component,
                YCoreAnnotationTagName,
              )

              expect(annotationElement[annotationProp]).toBe(value)
            },
          )
        }

        for (const { prop, case: propCase, value } of propDisabledAutocompleteCases) {
          it(
            `Поиск ${value ? 'не' : ''} должен быть совершен по указанному номеру если значение пропа "${prop}" равно "${propCase}"`,
            async() => {
              const handleSearch = vi.fn(searchFunction)
              await updateComponent({ props: { searchFunction: handleSearch, [prop]: value } })

              await callHandleInputEvent()

              if (value) {
                const dropdownList = getWCShadowRoot(component).querySelector(YCoreDropdownListTagName)
                expect(dropdownList).toBeNull()
                expect(handleSearch).not.toHaveBeenCalled()
              } else {
                expect(handleSearch).toHaveBeenCalled()
              }
            },
          )
        }

        for (const { prop, case: propCase, value, searchPhone } of propMinSearchLengthCases) {
          it(
            `Поиск ${Number(value) > searchPhone.length ? 'не' : ''} должен быть совершен по указанному номеру если значение пропа "${prop}" ${propCase}`,
            async() => {
              const handleSearch = vi.fn(searchFunction)
              await updateComponent({ props: { searchFunction: handleSearch, [prop]: value } })

              await callHandleInputEvent(searchPhone)

              if (searchPhone.length >= Number(value)) {
                expect(handleSearch).toHaveBeenCalled()
              } else {
                const dropdownList = getWCShadowRoot(component).querySelector(YCoreDropdownListTagName)
                expect(dropdownList).toBeNull()
                expect(handleSearch).not.toHaveBeenCalled()
              }
            },
          )
        }

        for (const { prop, case: propCase, value } of propWithoutCodeSelectionCases) {
          it(
            `${value ? 'Не должен' : 'Должен'} показать селект с выбором кода страны если значение пропа "${prop}" равняется ${propCase}`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              const phoneCode = getWCShadowRoot(component).querySelector(YCorePhoneCodeTagName)

              if (value) {
                expect(phoneCode).toBeNull()
              } else {
                expect(phoneCode).not.toBeNull()
              }
            },
          )
        }

        for (const { prop, case: propCase, value } of propSearchFunctionCases) {
          it(
            `Поиск ${value ? '' : 'не'} должен быть совершен по указанному номеру если значение пропа "${prop}" равно "${propCase}"`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              await callHandleInputEvent()

              const dropdownList = getWCShadowRoot(component).querySelector(YCoreDropdownListTagName)

              if (value) {
                expect(dropdownList).not.toBeNull()
              } else {
                expect(dropdownList).toBeNull()
              }
            },
          )
        }

        for (const { prop, case: propCase, value } of propDefaultCountryIdCases) {
          it(
            `Корректно инициализирует phoneCode, основываясь на ${propCase} ${prop}`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              const phoneCode = getSubWC(component, YCorePhoneCodeTagName)

              const firstCountryIdInList = parseInt(Object.keys(defaultCountriesData)[0], 10)
              const defaultCountry = value ? defaultCountriesData[value] : defaultCountriesData[firstCountryIdInList]

              expect(phoneCode.code).toBe(defaultCountry.code)
            },
          )
        }
      },
    )

    describe(
      'Events',
      () => {
        for (const { eventName, emitEventName, payload, event, case: eventCase } of fieldEvents) {
          it(
            `Должен вызывать событие "${emitEventName}" ${eventCase}`,
            () => {
              const inputField = getSubWC(
                component,
                YCoreFieldInputTagName,
              )

              const handler = vi.fn()
              component.addEventListener(
                emitEventName,
                handler,
              )

              inputField.dispatchEvent(event)

              expect(handler).toHaveBeenCalledTimes(1)

              if (payload) {
                expect(JSON.stringify((handler.mock.calls[0][0] as CustomEvent<TYCorePhoneFieldInfoWithMeta>).detail.meta.phoneBody)).toBe(JSON.stringify(payload.value))
              }
            },
          )

          it(
            `Не должен вызывать событие "${eventName}" ${eventCase} если компонент disabled`,
            async() => {
              await updateComponent({ props: { disabled: true } })

              const fieldInputElement = getSubWC(
                component,
                YCoreFieldInputTagName,
              )

              const handler = vi.fn()
              component.addEventListener(
                eventName,
                handler,
              )

              fieldInputElement.dispatchEvent(event)

              expect(handler).not.toHaveBeenCalled()
            },
          )
        }

        for (const { eventName, payload, event, case: eventCase } of wrapperEvents) {
          it(
            `Должен вызывать событие "${eventName}" ${eventCase}`,
            () => {
              const inputField = getSubWC(
                component,
                YCoreFieldWrapperTagName,
              )

              const handler = vi.fn()
              component.addEventListener(
                eventName,
                handler,
              )

              inputField.dispatchEvent(event)

              expect(handler).toHaveBeenCalledTimes(1)

              if (payload) {
                expect(JSON.stringify((handler.mock.calls[0][0] as CustomEvent<TYCorePhoneFieldInfoWithMeta>).detail.meta.phoneBody)).toBe(JSON.stringify(payload.value))
              }
            },
          )

          it(
            `Не должен вызывать событие "${eventName}" ${eventCase} если компонент disabled`,
            async() => {
              await updateComponent({ props: { disabled: true } })

              const fieldWrapperElement = getSubWC(
                component,
                YCoreFieldWrapperTagName,
              )

              const handler = vi.fn()
              component.addEventListener(
                eventName,
                handler,
              )

              fieldWrapperElement.dispatchEvent(event)

              expect(handler).not.toHaveBeenCalled()
            },
          )
        }
        it(
          'Должен вызывать событие selectOption при выборе значений из опций автокомплита',
          async() => {
            await updateComponent({ props: { searchFunction } })

            const handler = vi.fn()
            component.addEventListener(
              'select-option',
              handler,
            )

            await callHandleInputEvent()

            const dropdownListItem = getSubWC(component, YCoreDropdownCellTagName)

            await userEvent.click(dropdownListItem)
            expect(handler).toHaveBeenCalled()

            expect(JSON.stringify((handler.mock.calls[0][0] as CustomEvent<TYCorePhoneFieldAutocompleteOption>).detail)).toBe(JSON.stringify(autocompleteOptions[0]))
          },
        )
      },
    )
  },
)
