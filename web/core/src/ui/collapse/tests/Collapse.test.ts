import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { YCoreCollapseTagName, YCoreCollapseItemTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { sleep } from '~shared/tests/utils'
import {
  createCoreCollapseProps,
} from '~core/ui/collapse/models/types'
import '~core/ui/collapse'

import {
  CollapseItemClickEvent,
} from '~core/ui/collapseItem/models/types'

import {
  slotDefaultTestCases,
} from './cases/slots'
import {
  propValueCases,
  propTypeCases,
  propDraggableCases,
  propVariantCases,
} from './cases/props'
import {
  eventCollapseChangeCases,
  eventCollapseMoveCases,
} from './cases/events'

const tagName = YCoreCollapseTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreCollapseProps(),
)

describe(
  'Core/YCollapse',
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
            for (const testCase of slotDefaultTestCases) {
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
            for (const testCase of [
              ...propValueCases,
              ...propTypeCases,
              ...propDraggableCases,
              ...propVariantCases,
            ]) {
              it(
                `Prop "${testCase.prop}" должен быть ${testCase.case}`,
                async() => {
                  await updateComponent({ props: { [testCase.prop]: testCase.value } })

                  expect(component[testCase.prop]).toBe(testCase.value)
                },
              )
            }
          },
        )
        describe(
          'Events',
          () => {
            for (const testCase of [...eventCollapseChangeCases]) {
              it(
                `Должен генерировать событие ${testCase.event} ${testCase.case}`,
                async() => {
                  const eventHandler = vi.fn()
                  component.addEventListener(
                    testCase.event,
                    eventHandler,
                  )

                  const CollapseItemElement = document.createElement(YCoreCollapseItemTagName)
                  component.appendChild(CollapseItemElement)

                  await sleep(0)

                  CollapseItemElement.dispatchEvent(new CollapseItemClickEvent(
                    testCase.nodeEventName,
                    {
                      bubbles: true,
                      detail: {
                        event: new Event(testCase.nodeEventName),
                        value: 'test',
                        opened: true,
                      },
                    },
                  ))

                  expect(eventHandler).toHaveBeenCalledTimes(1)

                  component.removeChild(CollapseItemElement)
                },
              )
            }
            for (const testCase of [...eventCollapseMoveCases]) {
              it(
                `Должен генерировать событие ${testCase.event} ${testCase.case}`,
                async() => {
                  const {
                    component: componentWithCollapseItem,
                    updateComponent: updateComponentWithCollapseItem,
                    injectComponentToBody: injectComponentToBodyWithCollapseItem,
                    removeComponent: removeComponentWithCollapseItem,
                  } = useCoreTests(
                    tagName,
                    createCoreCollapseProps(),
                  )

                  const eventHandler = vi.fn()
                  componentWithCollapseItem.addEventListener(
                    testCase.event,
                    eventHandler,
                  )

                  const CollapseItemElement = document.createElement(YCoreCollapseItemTagName)
                  componentWithCollapseItem.appendChild(CollapseItemElement)
                  injectComponentToBodyWithCollapseItem()

                  await sleep(0)

                  await updateComponentWithCollapseItem({ props: { draggable: true } })

                  CollapseItemElement.setAttribute('draggable', 'true')
                  CollapseItemElement.dataset.dragging = 'true'

                  CollapseItemElement.dispatchEvent(new DragEvent(testCase.nodeEventName, { bubbles: true }))

                  expect(eventHandler).toHaveBeenCalledTimes(1)

                  componentWithCollapseItem.removeChild(CollapseItemElement)

                  removeComponentWithCollapseItem()
                },
              )
            }
          },
        )
      },
    )
  },
)
