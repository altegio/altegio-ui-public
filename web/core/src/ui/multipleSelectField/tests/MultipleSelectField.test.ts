import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import {
  YCoreFieldInputTagName,
  YCoreMultipleSelectFieldTagName,
  YCoreFieldWrapperTagName,
  YCoreLabelTagName,
  YCoreAnnotationTagName,
  YCoreErrorTagName,
  YCoreSimpleChipTagName,
  YCoreDropdownCellTagName,
} from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import type { SelectEvent, IYCoreMultipleSelectFieldExternalProps } from '~core/ui/multipleSelectField/models/types'
import {
  createCoreMultipleSelectFieldExternalProps,
} from '~core/ui/multipleSelectField/models/types'
import '~core/ui/multipleSelectField'
import { getWCShadowRoot } from '~shared/tests/utils'
import {
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
} from '~core/ui/multipleSelectField/tests/cases/props'
import { text, textWithTag } from '~shared/tests/slotContents'
import { wrapperEvents } from '~core/ui/multipleSelectField/tests/cases/events'
import { userEvent } from 'vitest/browser'
import { dropdownListSlotsTestCases } from '~core/ui/multipleSelectField/tests/cases/slots'

const tagName = YCoreMultipleSelectFieldTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreMultipleSelectFieldExternalProps(),
)

type TSubComponent = typeof YCoreFieldInputTagName | typeof YCoreAnnotationTagName | typeof YCoreErrorTagName | typeof YCoreDropdownCellTagName | typeof YCoreFieldWrapperTagName | typeof YCoreLabelTagName | typeof YCoreSimpleChipTagName

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
  'Core/YMultipleSelectField',
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
              'Should render the "annotation" slot in annotation',
              async() => {
                await updateComponent({ slots: { ['annotation']: textWithTag } })

                const slotContent = component.querySelector('div[slot="annotation"]')
                expect(slotContent?.innerHTML).toBe(textWithTag)
              },
            )

            for (const { slotName, content } of dropdownListSlotsTestCases) {
              it(
                `Should render the "${slotName}" slot in dropdownList`,
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
                `Prop "${prop}" should be "${propCase}" and passed to quark/fieldInput`,
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
                `Prop "${prop}" with value "${propCase}" should be "${String(expected)}" and passed to simpleChip`,
                async() => {
                  await updateComponent({ props: { [prop]: value, items: items } })

                  const chips = getWCShadowRoot(component).querySelectorAll(YCoreSimpleChipTagName)
                  const chipsSlotContent = [...chips].map((chip) => chip.textContent)

                  expect(chipsSlotContent).toStrictEqual(expected)
                },
              )
            }

            for (const { prop, case: propCase, value } of [
              ...propReadonlyTestCases,
              ...propSizeTestCases,
              ...propErrorTestCases,
            ]) {
              it(
                `Prop "${prop}" should be "${propCase}" and passed to quark/fieldWrapper`,
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
                `Prop "${prop}" should be "${propCase}" and passed to molecule/label`,
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
                `Prop "${prop}" should be "${propCase}" and passed to molecule/label`,
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
                `Prop "${prop}" should be "${propCase}" and passed to quark/fieldWrapper, atom/annotation and molecule/label`,
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
                `Prop "${prop}" should be "${propCase}" and passed to atom/error`,
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
                `Prop "${prop}" should be "${propCase}" and passed to atom/annotation`,
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
                `Prop "${prop}" with value "${propCase}" should resolve the item value and show "${String(expected)}" in simpleChip`,
                async() => {
                  await updateComponent({
                    props: {
                      [prop]: value,
                      value: (additionalProps?.selectedValue as IYCoreMultipleSelectFieldExternalProps['value']),
                      items: items,
                    },
                  })

                  const chips = getWCShadowRoot(component).querySelectorAll(YCoreSimpleChipTagName)
                  const chipsSlotContent = [...chips].map((chip) => chip.textContent)

                  expect(chipsSlotContent).toStrictEqual(expected)
                },
              )
            }

            for (const { prop, case: propCase, value, additionalProps } of propIsFilterableTestCases) {
              it(
                `Prop "${prop}" should be "${propCase}" and passed to fieldInput["readonly"]`,
                async() => {
                  await updateComponent({
                    props: {
                      [prop]: value,
                      ...additionalProps,
                    },
                  })

                  const inputField = getSubWC(
                    component,
                    YCoreFieldInputTagName,
                  )

                  expect(inputField.readonly).toBe(!value)
                },
              )
            }

            for (const { prop, case: propCase, value, additionalProps } of propFilterCallbackCases) {
              it(
                `Prop "${prop}" with value "${propCase}" ${value ? 'should' : 'should not'} run the callback`,
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
                `Prop "${prop}" with value "${propCase}" should emit input`,
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

                  expect(handler).toHaveBeenCalled()
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
                `Should emit "${eventName}" ${eventCase}`,
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
                `Should not emit "${eventName}" ${eventCase} when the component is disabled`,
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
              'Should emit "input" on input',
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
              'Should not emit "input" on input when the component is disabled',
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

            it(
              'Should emit select when values are selected from the options',
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
