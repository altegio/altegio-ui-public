import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'

import { useCoreTests } from '~shared/tests/core'
import { getShadowElement } from '~shared/tests/utils'

import {
  YCoreButtonDropdownTagName,
  YCoreButtonTagName,
  YCoreDropdownListTagName,
  YCoreDropdownCellTagName,
  YCoreDropdownTagName,
  YCoreSimpleButtonTagName,
  YCoreIconTagName,
} from '~shared/constants'
import type { IYIcon } from '~shared/icons'

import '../ButtonDropdown.core'
import type { YCoreButtonDropdown } from '../ButtonDropdown.core'

import {
  propIconTestCases,
  propItemsTestCases,
  propVariantTestCases,
  propDisabledTestCases,
  propSizeCases,
  propLoadingTestCases,
  propLabelTestCases,
  propFullWidthTestCases,
  propAutoCloseTestCases,
} from './cases/props'
import {
  slotActivatorTestCases,
  slotContentTestCases,
} from './cases/slots'
import { createCoreButtonDropdownProps } from '../models/types'
import { VisibleEvent } from '../models/types/events'

const tagName = YCoreButtonDropdownTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreButtonDropdownProps(),
)

const getLocalShadowElement = (selector: string) => {
  return getShadowElement(
    component,
    selector,
  )
}

const getSvgPathData = (svgString: string): string | null => {
  const match = (/<path[^>]*>/).exec(svgString)
  return match ? match[1] : null
}
const compareIcons = (svgString: string, icon: IYIcon): boolean => {
  const pathData = getSvgPathData(svgString)
  return pathData === getSvgPathData(icon.data)
}

describe(
  'Core/YButtonDropdown/Unit',
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
          'Props',
          () => {
            for (const testCase of [
              ...propVariantTestCases,
              ...propItemsTestCases,
              ...propDisabledTestCases,
              ...propSizeCases,
              ...propLoadingTestCases,
              ...propLabelTestCases,
              ...propFullWidthTestCases,
              ...propAutoCloseTestCases,
            ]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента. Case: ${testCase.case}`,
                async() => {
                  await updateComponent({ props: { [testCase.prop]: testCase.value } })

                  expect(component[testCase.prop]).toEqual(testCase.value)
                },
              )
            }

            for (const testCase of propIconTestCases) {
              const validIconsText = testCase.additionalProps.validIcons.map((icon) => icon.name).join(' или ')

              it(
                `Если ${testCase.case}, то она должна быть ${validIconsText}`,

                async() => {
                  await updateComponent({ props: { iconType: testCase.value } })

                  const buttonElement = getLocalShadowElement(YCoreButtonTagName) as YCoreButtonDropdown | null
                  if (!buttonElement) {
                    throw new Error('Button не найден')
                  }

                  const simpleButtonElement = getShadowElement(buttonElement, YCoreSimpleButtonTagName)
                  if (!simpleButtonElement) {
                    throw new Error('Simple button не найден')
                  }


                  const iconElements = simpleButtonElement.querySelectorAll(YCoreIconTagName)
                  if (iconElements.length !== 1) {
                    throw new Error('Количество иконок не равно 1')
                  }

                  const iconElement = iconElements[0]

                  const iconSvg = getShadowElement(iconElement, 'div > svg')
                  if (!iconSvg) {
                    throw new Error('Icon SVG не найден')
                  }

                  const isSvgValid = testCase.additionalProps.validIcons.some((icon) => compareIcons(iconSvg.innerHTML, icon))

                  expect(isSvgValid).toBeTruthy()
                },
              )
            }
          },
        )
        describe(
          'Events',
          () => {
            it(
              `Должен генерировать событие "item-click" при эмите "click" из ${YCoreDropdownCellTagName}`,
              async() => {
                await updateComponent({ props: { items: [{ id: '0', label: 'Item 1' }] } })

                const dropdownListElement = getLocalShadowElement(YCoreDropdownListTagName)
                if (!dropdownListElement) {
                  throw new Error('DropdownList не найден')
                }

                const dropdownCellElement = dropdownListElement.querySelector(`div > slot > ${YCoreDropdownCellTagName}`)
                if (!dropdownCellElement) {
                  throw new Error('Dropdown cell не найден')
                }

                const handleItemClick = vi.fn()

                component.addEventListener(
                  'item-click',
                  handleItemClick,
                )

                dropdownCellElement.dispatchEvent(new CustomEvent('click'))

                expect(handleItemClick).toHaveBeenCalledTimes(1)
              },
            )

            it(
              `Должен генерировать событие "change-visible" при эмите "change-visible" из ${YCoreDropdownTagName}`,
              () => {
                const dropdownElement = getLocalShadowElement(YCoreDropdownTagName)
                if (!dropdownElement) {
                  throw new Error('Dropdown не найден')
                }

                const handleItemClick = vi.fn()

                component.addEventListener(
                  'change-visible',
                  handleItemClick,
                )

                dropdownElement.dispatchEvent(new VisibleEvent('change-visible', { detail: { value: true } }))

                expect(handleItemClick).toHaveBeenCalledTimes(1)
              },
            )
          },
        )
        describe(
          'Slots',
          () => {
            for (const testCase of [
              ...slotActivatorTestCases,
              ...slotContentTestCases,
            ]) {
              it(
                `Slot "${testCase.slot}" должен быть ${testCase.case}`,
                async() => {
                  await updateComponent({ slots: { [testCase.slot]: testCase.content } })

                  expect(component.textContent).toBe(testCase.content)
                },
              )
            }
          },
        )
      },
    )
  },
)

