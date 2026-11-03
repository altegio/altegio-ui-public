import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'

import { text } from '~shared/tests/slotContents'
import { href } from '~shared/tests/mockData'
import { useCoreTests } from '~shared/tests/core'
import { EAnchorTarget, EAltSizes } from '~shared/types/global'
import { AltCoreSimpleButtonTagName, AltCoreLoaderTagName } from '~shared/constants'
import { classWithModifier, getElementClasses, getShadowElement, getShadowRootElement } from '~shared/tests/utils'
import type { IAltCoreSimpleButtonProps } from '~core/ui/simpleButton/models/types'
import {
  createCoreSimpleButtonExternalProps,
  createCoreSimpleButtonProps,
  EAltCoreSimpleButtonVariant,
  type IAltCoreSimpleButtonExternalProps,
} from '~core/ui/simpleButton/models/types'
import type { TPropTestCase } from '~shared/types/tests'
import '~core/ui/simpleButton'

const defaultProps: IAltCoreSimpleButtonProps = createCoreSimpleButtonProps()

// Unit test cases:
const propDisabledTestCases: TPropTestCase<IAltCoreSimpleButtonExternalProps, 'disabled'>[] = [
  {
    prop: 'disabled',
    case: 'have',
    value: true,
  },
  {
    prop: 'disabled',
    case: 'not have',
    value: false,
  },
]
const allowedSizes: (EAltSizes.SMALL | EAltSizes.MEDIUM | EAltSizes.LARGE)[] = [EAltSizes.SMALL, EAltSizes.MEDIUM, EAltSizes.LARGE]
const propSizeTestCases: TPropTestCase<IAltCoreSimpleButtonExternalProps, 'size'>[] = allowedSizes.map((size) => ({
  prop: 'size',
  case: size,
  value: size,
}))
const propVariantTestCases: TPropTestCase<IAltCoreSimpleButtonExternalProps, 'variant'>[] = Object.values(EAltCoreSimpleButtonVariant).map((variant) => ({
  prop: 'variant',
  case: variant,
  value: variant,
}))
const propFullWidthTestCases: TPropTestCase<IAltCoreSimpleButtonExternalProps, 'fullWidth'>[] = [
  { prop: 'fullWidth', case: 'true', value: true, expected: true },
  { prop: 'fullWidth', case: 'false', value: false, expected: false },
  { prop: 'fullWidth', case: 'default', value: undefined, expected: defaultProps.fullWidth },
]

const tagName = AltCoreSimpleButtonTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreSimpleButtonExternalProps(),
)

const localClassWithModifier = (modifier: string) => classWithModifier(
  tagName,
  modifier,
)

const getLocalShadowElement = (selector: string) => {
  return getShadowElement(
    component,
    selector,
  )
}

describe(
  'Core/AltCoreSimpleButton',
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
              ...propSizeTestCases,
              ...propVariantTestCases,
            ]) {
              const expectedCssClass = localClassWithModifier(`${testCase.prop}_${testCase.case}`)

              it(
                `Prop "${testCase.prop}" should change the rootElement class to "${expectedCssClass}"`,
                async() => {
                  await updateComponent({ props: { [testCase.prop]: testCase.value } })

                  const rootElement = getRootElement()
                  const rootElementClasses = getElementClasses(rootElement)

                  expect(rootElementClasses).toContain(expectedCssClass)
                },
              )
            }

            for (const testCase of propDisabledTestCases) {
              const expectedCssClass = localClassWithModifier('disabled')

              it(
                `Should ${testCase.case} the disabled class when prop disabled is ${testCase.value}`,
                async() => {
                  await updateComponent({ props: { disabled: testCase.value } })

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

            it(
              'Should show the loading state',
              async() => {
                // Arrange
                await updateComponent({ props: { loading: true } })

                const rootElement = getRootElement()
                const rootElementClasses = getElementClasses(rootElement)
                const expectedCssClass = localClassWithModifier('loading')

                // Act
                const loader = getLocalShadowElement(AltCoreLoaderTagName)

                // Assert
                expect(rootElementClasses).toContain(expectedCssClass)
                expect(loader).toBeTruthy()
              },
            )

            it(
              'Should not show the loading state',
              async() => {
                // Arrange
                await updateComponent({ props: { loading: false } })

                const rootElement = getRootElement()
                const rootElementClasses = getElementClasses(rootElement)
                const expectedCssClass = localClassWithModifier('loading')

                // Act
                const loader = rootElement?.querySelector('alt-core-loading')

                // Assert
                expect(rootElementClasses).not.toContain(expectedCssClass)
                expect(loader).toBeNull()
              },
            )

            it(
              'Should update when the href and target props change',
              async() => {
                const target = EAnchorTarget.BLANK

                await updateComponent({ props: { href, target } })

                const rootElement = getRootElement()

                expect(rootElement).toBeTruthy()
                expect(rootElement?.tagName.toLowerCase() === 'a').toBe(true)
                expect(rootElement?.getAttribute('href')).toBe(href)
                expect(rootElement?.getAttribute('target')).toBe(target)
              },
            )

            propFullWidthTestCases.forEach((testCase) => {
              const name = `${testCase.expected ? 'Should' : 'Should not'} stretch to the full parent width when fullWidth: ${testCase.value}`

              it(
                name,
                async() => {
                  await updateComponent({ props: { fullWidth: testCase.value } })

                  const rootElement = getRootElement()

                  if (!rootElement) throw Error('rootElement is missing')

                  if (testCase.expected) expect(rootElement.clientWidth).toBe(document.body.clientWidth)
                  else expect(rootElement.clientWidth).not.toBe(document.body.clientWidth)
                },
              )
            })
          },
        )

        describe(
          'Slots',
          () => {
            it(
              'Should render the text from the default slot',
              async() => {
                const slotElement = getRootElement()?.querySelector('slot')
                await updateComponent({ slots: { default: text } })

                const assignedNodes = slotElement?.assignedNodes()
                expect(assignedNodes?.[0].textContent).toBe(text)
              },
            )
          },
        )

        describe(
          'Events',
          () => {
            it(
              'Should emit click on click',
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
              'Should not emit click on click when the button is disabled',
              async() => {
                await updateComponent({ props: { disabled: true } })

                const clickHandler = vi.fn()
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
  },
)

const getRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}
