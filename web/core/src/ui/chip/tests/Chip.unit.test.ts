import { beforeAll, afterEach, describe, expect, it, afterAll, vi } from 'vitest'
import { getShadowRootElement, getWCShadowRoot, getElementClasses } from '~shared/tests/utils'
import { useCoreTests } from '~shared/tests/core'
import { AltCoreChipTagName, AltCoreIconTagName, AltCoreTextTagName } from '~shared/constants'
import '~core/ui/chip'

import { createCoreChipProps } from '~core/ui/chip/models/types'
import {
  propLabelTestCases,
  propIconLeftTestCases,
  propSizeTestCases,
  propActiveTestCases,
  propDisabledTestCases,
  chipIconLeftSizes,
  chipLabelTextSizes,
  chipIconLeftValue,
} from './cases/props'
import { EAltCoreTextSize, EAltCoreTextVariant } from '~core/ui/text/models/types'

const tagName = AltCoreChipTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreChipProps(),
)

const getRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

describe(
  'Core/AltCoreChip/Unit',
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
      'Rendering',
      () => {
        it(
          'Should render a div with the correct base class',
          async() => {
            await component.updateComplete

            const rootElement = getRootElement()
            const classes = getElementClasses(rootElement)

            expect(rootElement).not.toBeNull()
            expect(rootElement?.tagName.toLowerCase()).toBe('div')
            expect(classes).toContain(tagName)
            expect(classes).not.toContain(`${tagName}_active`)
            expect(classes).not.toContain(`${tagName}_disabled`)
          },
        )

        it(
          'Should render text with the correct size and variant',
          async() => {
            await component.updateComplete

            const shadowRoot = getWCShadowRoot(component)
            const textElement = shadowRoot.querySelector(AltCoreTextTagName)

            expect(textElement).not.toBeNull()
            expect(textElement?.size).toBe(EAltCoreTextSize.A2_REGULAR)
            expect(textElement?.variant).toBe(EAltCoreTextVariant.PRIMARY)
          },
        )

        it(
          'Should not render an icon',
          async() => {
            await component.updateComplete

            const shadowRoot = getWCShadowRoot(component)

            expect(shadowRoot.querySelector(AltCoreIconTagName)).toBeNull()
          },
        )
      },
    )

    describe(
      'Props',
      () => {
        for (const testCase of propLabelTestCases) {
          it(
            `Prop "${testCase.prop}" should render the value "${testCase.case}" and the CSS class`,
            async() => {
              await updateComponent({ props: { labelText: testCase.value } })

              const shadowRoot = getWCShadowRoot(component)
              const textElement = shadowRoot.querySelector(AltCoreTextTagName)
              const textClasses = getElementClasses(textElement)

              expect(textElement).not.toBeNull()
              expect(textElement?.textContent).toContain(testCase.value)
              expect(textClasses).toContain(`${tagName}__text`)
            },
          )
        }

        for (const testCase of propIconLeftTestCases) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} should render the icon with the correct size`,
            async() => {
              await updateComponent({ props: { iconLeft: testCase.value } })

              const shadowRoot = getWCShadowRoot(component)
              const iconElement = shadowRoot.querySelector(AltCoreIconTagName)

              expect(iconElement).not.toBeNull()
              expect(iconElement?.icon).toBe(testCase.value)
              expect(iconElement?.size).toBe(chipIconLeftSizes.small)
            },
          )
        }

        for (const testCase of propSizeTestCases) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} should apply the CSS class`,
            async() => {
              await updateComponent({ props: { size: testCase.value } })

              const rootElement = getRootElement()
              const classes = getElementClasses(rootElement)

              expect(classes).toContain(`${tagName}_size_${testCase.value}`)
            },
          )
        }

        for (const testCase of propSizeTestCases) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} should apply the text and icon size`,
            async() => {
              await updateComponent({ props: { size: testCase.value, iconLeft: chipIconLeftValue } })

              const shadowRoot = getWCShadowRoot(component)
              const iconElement = shadowRoot.querySelector(AltCoreIconTagName)
              const textElement = shadowRoot.querySelector(AltCoreTextTagName)

              expect(iconElement).not.toBeNull()

              if (testCase.value) {
                expect(iconElement?.size).toBe(chipIconLeftSizes[testCase.value])
                expect(textElement?.size).toBe(chipLabelTextSizes[testCase.value])
              }
            },
          )
        }

        for (const testCase of propActiveTestCases) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} should apply the CSS class`,
            async() => {
              await updateComponent({ props: { active: testCase.value } })

              const rootElement = getRootElement()
              const classes = getElementClasses(rootElement)

              expect(classes).toContain(`${tagName}_active`)
            },
          )
        }

        for (const testCase of propDisabledTestCases) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} should apply the CSS class and text color`,
            async() => {
              await updateComponent({ props: { disabled: testCase.value } })

              const rootElement = getRootElement()
              const classes = getElementClasses(rootElement)

              const shadowRoot = getWCShadowRoot(component)
              const textElement = shadowRoot.querySelector(AltCoreTextTagName)

              expect(classes).toContain(`${tagName}_disabled`)
              expect(textElement?.variant).toContain(EAltCoreTextVariant.TERTIARY)
            },
          )
        }
      },
    )

    describe(
      'Events',
      () => {
        it(
          'Should call the click handler on Chip click',
          () => {
            const clickHandler = vi.fn()

            component.addEventListener(
              'click',
              clickHandler,
            )

            component.dispatchEvent(new MouseEvent('click'))

            expect(clickHandler).toHaveBeenCalledTimes(1)
          },
        )

        it(
          'Should not call the click handler on Chip click when disabled',
          async() => {
            const clickHandler = vi.fn()

            await updateComponent({ props: { disabled: true } })

            component.addEventListener(
              'click',
              clickHandler,
            )

            component.dispatchEvent(new MouseEvent('click'))

            expect(clickHandler).not.toHaveBeenCalled()
          },
        )
      },
    )
  },
)
