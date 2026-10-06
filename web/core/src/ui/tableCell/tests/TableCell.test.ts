import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import { YCoreTableCellTagName as tagName, YCoreTextTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { getElementClasses, getShadowRootElement, getWCShadowRoot } from '~shared/tests/utils'
import {
  createCoreTableCellProps,
} from '~core/ui/tableCell/models/types'
import '~core/ui/tableCell'

import {
  slotPluginTestCases,
  slotCellTestCases,
} from './cases/slots'
import {
  propStickyTestCases,
  propDisabledTestCases,
  propAlignTestCases,
  propEllipsisTestCases,
  propLineclampTestCases,
  propItemTestCases,
  propItemLabelTestCases,
} from './cases/props'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreTableCellProps(),
)

const getRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

describe(
  'Core/YCoreTableCell',
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
            for (const testCase of [
              ...slotPluginTestCases,
              ...slotCellTestCases,
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
        describe(
          'Props',
          () => {
            for (const testCase of [...propDisabledTestCases, ...propStickyTestCases]) {
              const expectedCssClass = `${tagName}_${testCase.prop}`

              it(
                `${testCase.case} добавить класс ${expectedCssClass}, если prop ${testCase.prop} ${testCase.value}`,
                async() => {
                  await updateComponent({ props: { [testCase.prop]: testCase.value } })

                  const rootElement = getRootElement()
                  const rootElementClasses = getElementClasses(rootElement)

                  if (testCase.value) {
                    expect(rootElementClasses).toContain(expectedCssClass)
                  } else {
                    expect(rootElementClasses).not.toContain(expectedCssClass)
                  }
                },
              )
            }

            for (const testCase of propAlignTestCases) {
              const expectedCssClass = `${tagName}_align_${testCase.value}`

              it(
                `${testCase.case} добавить класс ${expectedCssClass}, если prop ${testCase.prop} ${testCase.value}`,
                async() => {
                  await updateComponent({ props: { [testCase.prop]: testCase.value } })

                  const rootElement = getRootElement()
                  const rootElementClasses = getElementClasses(rootElement)

                  if (testCase.value) {
                    expect(rootElementClasses).toContain(expectedCssClass)
                  } else {
                    expect(rootElementClasses).not.toContain(expectedCssClass)
                  }
                },
              )
            }

            for (const testCase of [...propEllipsisTestCases, ...propLineclampTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у ${YCoreTextTagName} компонента. Case: ${testCase.case}`,
                async() => {
                  await updateComponent({ props: { [testCase.prop]: testCase.value } })

                  const textComponent = getWCShadowRoot(component).querySelector(YCoreTextTagName)

                  expect(textComponent?.[testCase.prop]).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of propItemTestCases) {
              it(
                `Prop "${testCase.prop}" ${testCase.case} должен установить правильное значение и отобразить контент`,
                async() => {
                  await updateComponent({ props: { [testCase.prop]: testCase.value } })

                  const textComponent = getWCShadowRoot(component).querySelector(YCoreTextTagName)
                  const actualContent = textComponent?.textContent?.trim()
                  expect(actualContent).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of propItemLabelTestCases) {
              it(
                `Prop "${testCase.prop}" ${testCase.case} должен установить правильное значение и отобразить контент`,
                async() => {
                  await updateComponent({
                    props: {
                      item: { id: '1', [testCase.value as string]: testCase.expected },
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const textComponent = getWCShadowRoot(component).querySelector(YCoreTextTagName)
                  const actualContent = textComponent?.textContent?.trim()
                  expect(actualContent).toBe(testCase.expected)
                },
              )
            }
          },
        )
      },
    )
  },
)
