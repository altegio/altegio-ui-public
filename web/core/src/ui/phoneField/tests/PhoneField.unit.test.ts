import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

import {
  AltCoreErrorTagName,
  AltCoreFieldInputTagName,
  AltCorePhoneFieldTagName,
  AltCoreDropdownCellTagName,
  AltCoreDropdownCellTextTagName,
  AltCoreAnnotationTagName,
  AltCoreDropdownListTagName,
  AltCorePhoneCodeTagName,
  AltCoreFieldWrapperTagName,
  AltCoreLabelTagName,
} from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot } from '~shared/tests/utils'
import '~core/ui/phoneField'
import type {
  TAltCorePhoneFieldAutocompleteOption,
  TAltCorePhoneFieldInfoWithMeta,
} from '~core/ui/phoneField/models/types'
import {
  createCorePhoneFieldProps,
} from '~core/ui/phoneField/models/types'
import { wrapperEvents, fieldEvents } from '~core/ui/phoneField/tests/cases/events'
import { userEvent } from 'vitest/browser'
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
import { en, type ILocale } from '~core/i18n'
import type { AltCoreDropdownCellText } from '~core/ui/dropdownCellText'

const tagName = AltCorePhoneFieldTagName

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

type TSubComponent = typeof AltCoreFieldInputTagName | typeof AltCoreAnnotationTagName | typeof AltCoreErrorTagName | typeof AltCoreDropdownListTagName | typeof AltCoreDropdownCellTagName | typeof AltCorePhoneCodeTagName | typeof AltCoreFieldWrapperTagName | typeof AltCoreLabelTagName

const getSubWC = <T extends TSubComponent>(primaryWC: HTMLElement, secondaryWC: T) => {
  const subWC = getWCShadowRoot(primaryWC).querySelector(secondaryWC)
  if (!subWC) throw new Error(`${secondaryWC} not found`)
  return subWC
}

const callHandleInputEvent = async(searchPhone = searchNumberValue) => {
  vi.useFakeTimers()

  const inputField = getSubWC(
    component,
    AltCoreFieldInputTagName,
  )

  const fieldInputEvent = new CustomEvent(
    'input',
    { detail: { value: searchPhone } },
  )

  inputField.dispatchEvent(fieldInputEvent)

  await vi.advanceTimersByTimeAsync(1500)
}

describe(
  'Core/AltCorePhoneField/Unit',
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
          'Should render the "annotation" slot in annotation',
          async() => {
            await updateComponent({ slots: { ['annotation']: textWithTag } })

            const slotContent = component.querySelector('div[slot="annotation"]')
            expect(slotContent?.innerHTML).toBe(textWithTag)
          },
        )

        it(
          'Should render the "list" slot in dropdownList',
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
            `Prop "${prop}" should be "${propCase}" and passed to fieldInput`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              const inputField = getSubWC(
                component,
                AltCoreFieldInputTagName,
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
            `Prop "${prop}" should be "${propCase}" and passed to fieldWrapper`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              const inputField = getSubWC(
                component,
                AltCoreFieldWrapperTagName,
              )

              expect(inputField[prop]).toBe(value)
            },
          )
        }

        for (const { prop, labelProp, case: propCase, value } of [...propLabelTextCases]) {
          it(
            `Prop "${prop}" should be "${propCase}" and passed to label`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              if (value) {
                const labelElement = getSubWC(
                  component,
                  AltCoreLabelTagName,
                )
                expect(labelElement[labelProp]).toBe(value)
              } else {
                expect(() => getSubWC(
                  component,
                  AltCoreLabelTagName,
                )).toThrow(`${AltCoreLabelTagName} not found`)
              }
            },
          )
        }

        for (const { prop, case: propCase, value, labelProp } of [...propLabelTooltipTextCases]) {
          it(
            `Prop "${prop}" should be "${propCase}" and passed to label`,
            async() => {
              await updateComponent({
                props: {
                  [prop]: value,
                  labelText: text,
                },
              })

              const labelElement = getSubWC(
                component,
                AltCoreLabelTagName,
              )

              expect(labelElement[labelProp]).toBe(value)
            },
          )
        }

        for (const { prop, case: propCase, value } of propDisabledCases) {
          it(
            `Prop "${prop}" should be "${propCase}" and passed to fieldWrapper, annotation and label`,
            async() => {
              await updateComponent({ props: { [prop]: value, annotationText: text, labelText: text } })

              const inputFieldElement = getSubWC(
                component,
                AltCoreFieldInputTagName,
              )

              const annotationElement = getSubWC(
                component,
                AltCoreAnnotationTagName,
              )

              const labelElement = getSubWC(
                component,
                AltCoreLabelTagName,
              )

              expect(labelElement.disabled).toBe(value)
              expect(inputFieldElement.disabled).toBe(value)
              expect(annotationElement.disabled).toBe(value)
            },
          )
        }

        for (const { prop, case: propCase, value } of propErrorsCases) {
          it(
            `Prop "${prop}" should be "${propCase}" and passed to error`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              if (value?.length) {
                const errorElement = getSubWC(
                  component,
                  AltCoreErrorTagName,
                )
                expect(errorElement.errors).toBe(value)
              } else {
                expect(() => getSubWC(
                  component,
                  AltCoreErrorTagName,
                )).toThrow(`${AltCoreErrorTagName} not found`)
              }
            },
          )
        }

        for (const { prop, case: propCase, value, annotationProp } of propAnnotationTextCases) {
          it(
            `Prop "${prop}" should be "${propCase}" and passed to annotation`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              const annotationElement = getSubWC(
                component,
                AltCoreAnnotationTagName,
              )

              expect(annotationElement[annotationProp]).toBe(value)
            },
          )
        }

        for (const { prop, case: propCase, value } of propDisabledAutocompleteCases) {
          it(
            `Search should ${value ? 'not' : ''} run on the given number when prop "${prop}" is "${propCase}"`,
            async() => {
              const handleSearch = vi.fn(searchFunction)
              await updateComponent({ props: { searchFunction: handleSearch, [prop]: value } })

              await callHandleInputEvent()

              if (value) {
                const dropdownList = getWCShadowRoot(component).querySelector(AltCoreDropdownListTagName)
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
            `Search should ${Number(value) > searchPhone.length ? 'not' : ''} run on the given number when prop "${prop}" ${propCase}`,
            async() => {
              const handleSearch = vi.fn(searchFunction)
              await updateComponent({ props: { searchFunction: handleSearch, [prop]: value } })

              await callHandleInputEvent(searchPhone)

              if (searchPhone.length >= Number(value)) {
                expect(handleSearch).toHaveBeenCalled()
              } else {
                const dropdownList = getWCShadowRoot(component).querySelector(AltCoreDropdownListTagName)
                expect(dropdownList).toBeNull()
                expect(handleSearch).not.toHaveBeenCalled()
              }
            },
          )
        }

        for (const { prop, case: propCase, value } of propWithoutCodeSelectionCases) {
          it(
            `${value ? 'Should not' : 'Should'} show the country code select when prop "${prop}" is ${propCase}`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              const phoneCode = getWCShadowRoot(component).querySelector(AltCorePhoneCodeTagName)

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
            `Search should ${value ? '' : 'not'} run on the given number when prop "${prop}" is "${propCase}"`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              await callHandleInputEvent()

              const dropdownList = getWCShadowRoot(component).querySelector(AltCoreDropdownListTagName)

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
            `Initializes phoneCode correctly when ${prop} is ${propCase}`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              const phoneCode = getSubWC(component, AltCorePhoneCodeTagName)

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
            `Should emit "${emitEventName}" ${eventCase}`,
            () => {
              const inputField = getSubWC(
                component,
                AltCoreFieldInputTagName,
              )

              const handler = vi.fn()
              component.addEventListener(
                emitEventName,
                handler,
              )

              inputField.dispatchEvent(event)

              expect(handler).toHaveBeenCalledTimes(1)

              if (payload) {
                expect(JSON.stringify((handler.mock.calls[0][0] as CustomEvent<TAltCorePhoneFieldInfoWithMeta>).detail.meta.phoneBody)).toBe(JSON.stringify(payload.value))
              }
            },
          )

          it(
            `Should not emit "${eventName}" ${eventCase} when the component is disabled`,
            async() => {
              await updateComponent({ props: { disabled: true } })

              const fieldInputElement = getSubWC(
                component,
                AltCoreFieldInputTagName,
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
            `Should emit "${eventName}" ${eventCase}`,
            () => {
              const inputField = getSubWC(
                component,
                AltCoreFieldWrapperTagName,
              )

              const handler = vi.fn()
              component.addEventListener(
                eventName,
                handler,
              )

              inputField.dispatchEvent(event)

              expect(handler).toHaveBeenCalledTimes(1)

              if (payload) {
                expect(JSON.stringify((handler.mock.calls[0][0] as CustomEvent<TAltCorePhoneFieldInfoWithMeta>).detail.meta.phoneBody)).toBe(JSON.stringify(payload.value))
              }
            },
          )

          it(
            `Should not emit "${eventName}" ${eventCase} when the component is disabled`,
            async() => {
              await updateComponent({ props: { disabled: true } })

              const fieldWrapperElement = getSubWC(
                component,
                AltCoreFieldWrapperTagName,
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
          'Should emit selectOption when an autocomplete option is selected',
          async() => {
            await updateComponent({ props: { searchFunction } })

            const handler = vi.fn()
            component.addEventListener(
              'select-option',
              handler,
            )

            await callHandleInputEvent()

            const dropdownListItem = getSubWC(component, AltCoreDropdownCellTagName)

            await userEvent.click(dropdownListItem)
            expect(handler).toHaveBeenCalled()

            expect(JSON.stringify((handler.mock.calls[0][0] as CustomEvent<TAltCorePhoneFieldAutocompleteOption>).detail)).toBe(JSON.stringify(autocompleteOptions[0]))
          },
        )
      },
    )

    describe(
      'Country names',
      () => {
        const latviaId = 2

        const getCountryTitle = async({ lang, locale }: { lang?: string; locale?: ILocale }) => {
          const wrapper = document.createElement('div')
          if (lang) wrapper.lang = lang

          const phoneField = document.createElement(tagName)
          if (locale) phoneField.locale = locale

          wrapper.appendChild(phoneField)
          document.body.appendChild(wrapper)

          try {
            await phoneField.updateComplete
            getSubWC(phoneField, AltCorePhoneCodeTagName).click()

            return await vi.waitFor(() => {
              const cellText = getWCShadowRoot(phoneField)
                .querySelector<AltCoreDropdownCellText>(`[locator="${AltCoreDropdownCellTagName}_${latviaId}"] ${AltCoreDropdownCellTextTagName}`)
              const label = cellText?.label ?? ''
              if (!label.includes('(') || label.endsWith('()')) throw new Error('Country names are not loaded')

              return label
            })
          } finally {
            wrapper.remove()
          }
        }

        it(
          'Uses English names without a configured locale or page language',
          async() => {
            expect(await getCountryTitle({})).toBe('+371 (Latvia)')
          },
        )

        it(
          'Uses the language of the nearest lang attribute',
          async() => {
            expect(await getCountryTitle({ lang: 'hu' })).toBe('+371 (Lettország)')
            expect(await getCountryTitle({ lang: 'ru-RU' })).toBe('+371 (Латвия)')
          },
        )

        it(
          'Prefers the configured locale over the lang attribute',
          async() => {
            expect(await getCountryTitle({ lang: 'hu', locale: en })).toBe('+371 (Latvia)')
          },
        )
      },
    )
  },
)
