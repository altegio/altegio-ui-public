import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import type { YCoreDropdownListTagName, YCorePhoneCodeTagName } from '~shared/constants'
import {
  YCoreFieldInputTagName,
  YCoreSelectFieldTagName,
  YCoreFieldWrapperTagName,
  YCoreLabelTagName,
  YCoreAnnotationTagName,
  YCoreErrorTagName,
  YCoreDropdownCellTagName,
} from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import type { SelectEvent, TYCoreSelectFieldItemValue } from '~core/ui/selectField/models/types'
import {
  createCoreSelectFieldProps,
} from '~core/ui/selectField/models/types'
import '~core/ui/selectField'
import { getWCShadowRoot } from '~shared/tests/utils'
import {
  filterCallback,
  items,
  propAnnotationTextTestCases,
  propAutofocusTestCases,
  propDisabledTestCases,
  propErrorsTestCases, propFilterCallbackCases, propIsCustomFilterTestCases,
  propIsFilterableTestCases,
  propIsMapOptionsTestCases,
  propItemLabelTestCases,
  propItemValueTestCases,
  propLabelDebounceTestCases,
  propLabelTextTestCases,
  propLabelTooltipTextTestCases,
  propNameTestCases,
  propPlaceholderTestCases,
  propReadonlyTestCases,
  propRequiredTestCases,
  propSizeTestCases,
  propValueTestCases,
  propErrorTestCases,
} from '~core/ui/selectField/tests/cases/props'
import { text, textWithTag } from '~shared/tests/slotContents'
import { wrapperEvents } from '~core/ui/selectField/tests/cases/events'
import { userEvent } from '@vitest/browser/context'
import { dropdownListSlotsTestCases } from '~core/ui/selectField/tests/cases/slots'

const tagName = YCoreSelectFieldTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreSelectFieldProps(),
)

type TSubComponent = typeof YCoreFieldInputTagName | typeof YCoreAnnotationTagName | typeof YCoreErrorTagName | typeof YCoreDropdownListTagName | typeof YCoreDropdownCellTagName | typeof YCorePhoneCodeTagName | typeof YCoreFieldWrapperTagName | typeof YCoreLabelTagName

const getSubWC = <T extends TSubComponent>(primaryWC: HTMLElement, secondaryWC: T) => {
  const subWC = getWCShadowRoot(primaryWC).querySelector(secondaryWC)
  if (!subWC) throw new Error(`${secondaryWC} not found`)
  return subWC
}

const callHandleInputEvent = async() => {
  vi.useFakeTimers()

  const inputField = getSubWC(component, YCoreFieldInputTagName)
  inputField.dispatchEvent(new CustomEvent('input', { detail: { value: text } }))

  await vi.advanceTimersByTimeAsync(300)
}

describe(
  'Core/YSelectField',
  () => {
    beforeAll(() => {
      injectComponentToBody()
    })

    afterEach(async() => {
      await resetComponent()
    })

    afterAll(() => {
      removeComponent()
    })

    describe(
      'Unit',
      () => {
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

            for (const { slotName, content } of dropdownListSlotsTestCases) {
              it(
                `Должен отрендерить слот "${slotName}" в dropdownList`,
                async() => {
                  await updateComponent({ slots: { [slotName]: content } })

                  await userEvent.click(component)

                  const slotContent = component.querySelector(`div[slot="${slotName}"]`)
                  expect(slotContent?.innerHTML).toBe(textWithTag)
                },
              )
            }
          },
        )

        describe(
          'Props',
          () => {
            for (const { prop, case: propCase, value } of [
              ...propNameTestCases,
              ...propPlaceholderTestCases,
              ...propAutofocusTestCases,
              ...propRequiredTestCases,
            ]) {
              it(
                `Проп "${prop}" должен быть "${propCase}" и передан в quark/fieldInput`,
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

            for (const { prop, case: propCase, value, expected } of propValueTestCases) {
              it(
                `Проп "${prop}" cо значением "${propCase}" должен быть "${String(expected)}" и передан в quark/fieldInput`,
                async() => {
                  await updateComponent({ props: { [prop]: value, items: items } })

                  const inputField = getSubWC(
                    component,
                    YCoreFieldInputTagName,
                  )

                  expect(inputField[prop]).toBe(expected)
                },
              )
            }

            for (const { prop, case: propCase, value } of [
              ...propReadonlyTestCases,
              ...propSizeTestCases,
              ...propErrorTestCases,
            ]) {
              it(
                `Проп "${prop}" должен быть "${propCase}" и передан в quark/fieldWrapper`,
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

            for (const { prop, labelProp, case: propCase, value } of [...propLabelTextTestCases]) {
              it(
                `Проп "${prop}" должен быть "${propCase}" и передан в molecule/label`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  if (value) {
                    const moleculeLabel = getSubWC(
                      component,
                      YCoreLabelTagName,
                    )
                    expect(moleculeLabel[labelProp]).toBe(value)
                  } else {
                    expect(() => getSubWC(
                      component,
                      YCoreLabelTagName,
                    )).toThrow(`${YCoreLabelTagName} not found`)
                  }
                },
              )
            }

            for (const { prop, case: propCase, value, labelProp } of [
              ...propLabelTooltipTextTestCases,
              ...propLabelDebounceTestCases,
            ]) {
              it(
                `Проп "${prop}" должен быть "${propCase}" и передан в molecule/label`,
                async() => {
                  await updateComponent({
                    props: {
                      [prop]: value,
                      labelText: text,
                    },
                  })

                  const moleculeLabel = getSubWC(
                    component,
                    YCoreLabelTagName,
                  )

                  expect(moleculeLabel[labelProp]).toBe(value)
                },
              )
            }

            for (const { prop, case: propCase, value } of propDisabledTestCases) {
              it(
                `Проп "${prop}" должен быть "${propCase}" и передан в quark/fieldWrapper, atom/annotation и molecule/label`,
                async() => {
                  await updateComponent({ props: { [prop]: value, annotationText: text, labelText: text } })

                  const inputField = getSubWC(
                    component,
                    YCoreFieldInputTagName,
                  )

                  const atomAnnotation = getSubWC(
                    component,
                    YCoreAnnotationTagName,
                  )

                  const moleculeLabel = getSubWC(
                    component,
                    YCoreLabelTagName,
                  )

                  expect(moleculeLabel.disabled).toBe(value)
                  expect(inputField.disabled).toBe(value)
                  expect(atomAnnotation.disabled).toBe(value)
                },
              )
            }

            for (const { prop, case: propCase, value } of propErrorsTestCases) {
              it(
                `Проп "${prop}" должен быть "${propCase}" и передан в atom/error`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  if (value?.length) {
                    const atomError = getSubWC(
                      component,
                      YCoreErrorTagName,
                    )
                    expect(atomError.errors).toBe(value)
                  } else {
                    expect(() => getSubWC(
                      component,
                      YCoreErrorTagName,
                    )).toThrow(`${YCoreErrorTagName} not found`)
                  }
                },
              )
            }

            for (const { prop, case: propCase, value, annotationProp } of propAnnotationTextTestCases) {
              it(
                `Проп "${prop}" должен быть "${propCase}" и передан в atom/annotation`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  const atomAnnotation = getSubWC(
                    component,
                    YCoreAnnotationTagName,
                  )

                  expect(atomAnnotation[annotationProp]).toBe(value)
                },
              )
            }

            for (const { prop, case: propCase, value, expected, additionalProps } of [
              ...propItemValueTestCases,
              ...propItemLabelTestCases,
              ...propIsMapOptionsTestCases,
            ]) {
              it(
                `Проп "${prop}" со значением "${propCase}" должен правильно определять значение элемента и отображать "${String(expected)}" в инпуте`,
                async() => {
                  await updateComponent({
                    props: {
                      [prop]: value,
                      value: (additionalProps?.selectedValue as TYCoreSelectFieldItemValue),
                      items: items,
                    },
                  })

                  const inputField = getSubWC(
                    component,
                    YCoreFieldInputTagName,
                  )

                  expect(inputField.value).toBe(expected)
                },
              )
            }

            for (const { prop, case: propCase, value, additionalProps } of propIsFilterableTestCases) {
              it(
                `Проп "${prop}" со значением "${propCase}" ${value ? 'должен' : 'не должен'} запустить фильтрацию`,
                async() => {
                  const handleFilter = vi.fn(filterCallback)

                  await updateComponent({
                    props: {
                      [prop]: value,
                      ...additionalProps,
                      filterCallback: handleFilter,
                    },
                  })

                  await callHandleInputEvent()

                  if (value) {
                    expect(handleFilter).toHaveBeenCalled()
                  } else {
                    expect(handleFilter).not.toHaveBeenCalled()
                  }
                },
              )
            }

            for (const { prop, case: propCase, value, additionalProps } of propFilterCallbackCases) {
              it(
                `Проп "${prop}" со значением "${propCase}" ${value ? 'должен' : 'не должен'} должен запустить callback`,
                async() => {
                  const handleFilter = vi.fn(value)
                  await updateComponent({
                    props: {
                      [prop]: handleFilter,
                      ...additionalProps,
                    },
                  })

                  await callHandleInputEvent()

                  if (value) {
                    expect(handleFilter).toHaveBeenCalled()
                  } else {
                    expect(handleFilter).not.toHaveBeenCalled()
                  }
                },
              )
            }

            for (const { prop, case: propCase, value } of propIsCustomFilterTestCases) {
              it(
                `Проп "${prop}" со значением "${propCase}" ${value ? 'должен' : 'не должен'} вызвать событие input`,
                async() => {
                  await updateComponent({
                    props: {
                      [prop]: value,
                      items: items,
                      isFilterable: true,
                    },
                  })

                  const handler = vi.fn()
                  component.addEventListener(
                    'input',
                    handler,
                  )

                  await callHandleInputEvent()

                  if (value) {
                    expect(handler).toHaveBeenCalled()
                  } else {
                    expect(handler).not.toHaveBeenCalled()
                  }
                },
              )
            }
          },
        )

        describe(
          'Events',
          () => {
            for (const { eventName, event, case: eventCase } of wrapperEvents) {
              it(
                `Должен вызывать событие "${eventName}" ${eventCase}`,
                () => {
                  const inputField = getSubWC(
                    component,
                    YCoreFieldInputTagName,
                  )

                  const handler = vi.fn()
                  component.addEventListener(
                    eventName,
                    handler,
                  )

                  inputField.dispatchEvent(event)

                  expect(handler).toHaveBeenCalled()
                },
              )

              it(
                `Не должен вызывать событие "${eventName}" ${eventCase} если компонент disabled`,
                async() => {
                  await updateComponent({ props: { disabled: true } })

                  const atomInput = getSubWC(
                    component,
                    YCoreFieldInputTagName,
                  )

                  const handler = vi.fn()
                  component.addEventListener(
                    eventName,
                    handler,
                  )

                  atomInput.dispatchEvent(event)

                  expect(handler).not.toHaveBeenCalled()
                },
              )
            }

            it(
              'Должен вызывать событие "input" при вводе',
              async() => {
                await updateComponent({ props: { isCustomFilter: true } })

                const handler = vi.fn()
                component.addEventListener(
                  'input',
                  handler,
                )

                await callHandleInputEvent()

                expect(handler).toHaveBeenCalled()
              },
            )

            it(
              'Не должен вызывать событие "input" при вводе если компонент disabled',
              async() => {
                await updateComponent({ props: { isCustomFilter: true, disabled: true } })

                const handler = vi.fn()
                component.addEventListener(
                  'input',
                  handler,
                )

                await callHandleInputEvent()

                expect(handler).not.toHaveBeenCalled()
              },
            )

            it.skip(
              'Должен вызывать событие select при выборе значений из опций',
              async() => {
                await updateComponent({ props: { items } })

                const handler = vi.fn()
                component.addEventListener(
                  'select',
                  handler,
                )

                await userEvent.click(component)

                setTimeout(() => {
                  requestAnimationFrame(() => {
                    const dropdownListItem = getSubWC(component, YCoreDropdownCellTagName)

                    userEvent.click(dropdownListItem)
                    expect(handler).toHaveBeenCalled()

                    expect(JSON.stringify((handler.mock.calls[0][0] as SelectEvent).detail.value)).toBe(JSON.stringify([items?.[0]]))
                  })
                })
              },
            )
          },
        )
      },
    )
  },
)
