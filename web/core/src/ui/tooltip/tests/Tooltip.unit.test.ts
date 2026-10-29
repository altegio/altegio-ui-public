import { getWCShadowRoot, trimTextContent } from '~shared/tests/utils'
import { createCoreTooltipProps } from '~core/ui/tooltip/models/types'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { YCoreTooltipTagName } from '~shared/constants'
import { empty } from '~shared/tests/slotContents'
import { useCoreTests } from '~shared/tests/core'
import '~core/ui/tooltip'
import { propTextTestCases } from '~core/ui/tooltip/tests/cases/props'
import { slotContentNoProvidedTestCases, slotContentProvidedTestCases } from '~core/ui/tooltip/tests/cases/slots'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  YCoreTooltipTagName,
  createCoreTooltipProps(),
)


describe(
  'Core/YCoreTooltip/Unit',
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
        for (const testCase of [...propTextTestCases]) {
          it(
            `Should render prop "${testCase.prop}" in the "content" slot when the "content" slot is not provided`,
            async() => {
              await updateComponent({
                props: { text: testCase.value },
                slots: { activator: 'Activator' },
              })

              const textContent = getWCShadowRoot(component).textContent

              expect(textContent).toContain(testCase.value)
            },
          )
        }


        describe(
          'Slots',
          () => {
            for (const testCase of [...slotContentProvidedTestCases]) {
              it(
                `Slot "${testCase.slot}" should render ${testCase.case}`,
                async() => {
                  await updateComponent({
                    slots: { content: testCase.content, activator: 'Activator' },
                    props: testCase.props,
                  })

                  expect(component.textContent).toContain(testCase.content)
                },
              )
            }

            for (const testCase of [...slotContentNoProvidedTestCases]) {
              it(
                `Slot "${testCase.slot}" should render ${testCase.case}`,
                async() => {
                  await updateComponent({
                    slots: { [testCase.slot]: testCase.content, activator: 'Activator' },
                    props: testCase.props,
                  })

                  const contentSlotElement = getWCShadowRoot(component).querySelector('[slot="content"]')

                  if (testCase.props?.text) {
                    expect(trimTextContent(contentSlotElement?.textContent)).toContain(testCase.props.text)
                  } else {
                    expect(trimTextContent(contentSlotElement?.textContent)).toBe(empty)
                  }
                },
              )
            }
          },
        )
      },
    )
  },
)
