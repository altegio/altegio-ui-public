import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'

import { text } from '~shared/tests/slotContents'
import { href } from '~shared/tests/mockData'
import { useCoreTests } from '~shared/tests/core'
import { EAnchorTarget, EYSizes } from '~shared/types/global'
import { YCoreSimpleButtonTagName, YCoreLoaderTagName } from '~shared/constants'
import { classWithModifier, getElementClasses, getShadowElement, getShadowRootElement } from '~shared/tests/utils'
import type { IYCoreSimpleButtonProps } from '~core/ui/simpleButton/models/types'
import {
  createCoreSimpleButtonExternalProps,
  createCoreSimpleButtonProps,
  EYCoreSimpleButtonVariant,
  type IYCoreSimpleButtonExternalProps,
} from '~core/ui/simpleButton/models/types'
import type { TPropTestCase } from '~shared/types/tests'
import '~core/ui/simpleButton'

const defaultProps: IYCoreSimpleButtonProps = createCoreSimpleButtonProps()

// Unit test cases:
const propDisabledTestCases: TPropTestCase<IYCoreSimpleButtonExternalProps, 'disabled'>[] = [
  {
    prop: 'disabled',
    case: 'содержать',
    value: true,
  },
  {
    prop: 'disabled',
    case: 'отсутствовать',
    value: false,
  },
]
const allowedSizes: (EYSizes.SMALL | EYSizes.MEDIUM | EYSizes.LARGE)[] = [EYSizes.SMALL, EYSizes.MEDIUM, EYSizes.LARGE]
const propSizeTestCases: TPropTestCase<IYCoreSimpleButtonExternalProps, 'size'>[] = allowedSizes.map((size) => ({
  prop: 'size',
  case: size,
  value: size,
}))
const propVariantTestCases: TPropTestCase<IYCoreSimpleButtonExternalProps, 'variant'>[] = Object.values(EYCoreSimpleButtonVariant).map((variant) => ({
  prop: 'variant',
  case: variant,
  value: variant,
}))
const propFullWidthTestCases: TPropTestCase<IYCoreSimpleButtonExternalProps, 'fullWidth'>[] = [
  { prop: 'fullWidth', case: 'true', value: true, expected: true },
  { prop: 'fullWidth', case: 'false', value: false, expected: false },
  { prop: 'fullWidth', case: 'default', value: undefined, expected: defaultProps.fullWidth },
]

const tagName = YCoreSimpleButtonTagName

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
  'Core/YCoreSimpleButton',
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
                `Prop "${testCase.prop}" должен изменить класс у rootElement на "${expectedCssClass}"`,
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
                `Должен ${testCase.case} класс disabled, если prop disabled ${testCase.value}`,
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
              'Должен отображать состояние загрузки',
              async() => {
                // Arrange
                await updateComponent({ props: { loading: true } })

                const rootElement = getRootElement()
                const rootElementClasses = getElementClasses(rootElement)
                const expectedCssClass = localClassWithModifier('loading')

                // Act
                const loader = getLocalShadowElement(YCoreLoaderTagName)

                // Assert
                expect(rootElementClasses).toContain(expectedCssClass)
                expect(loader).toBeTruthy()
              },
            )

            it(
              'Не должен отображать состояние загрузки',
              async() => {
                // Arrange
                await updateComponent({ props: { loading: false } })

                const rootElement = getRootElement()
                const rootElementClasses = getElementClasses(rootElement)
                const expectedCssClass = localClassWithModifier('loading')

                // Act
                const loader = rootElement?.querySelector('y-core-loading')

                // Assert
                expect(rootElementClasses).not.toContain(expectedCssClass)
                expect(loader).toBeNull()
              },
            )

            it(
              'Должен корректно изменяться при изменении prop href и target',
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
              const name = `${testCase.expected ? 'Должен' : 'Не должен'} растягиваться на всю ширину родителя при fullWidth: ${testCase.value}`

              it(
                name,
                async() => {
                  await updateComponent({ props: { fullWidth: testCase.value } })

                  const rootElement = getRootElement()

                  if (!rootElement) throw Error('Отсутствует rootElement')

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
              'Должен отрендерить текст из default слота',
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
              'Должен генерировать событие click при клике',
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
              'Не должен генерировать событие click при клике, если кнопка отключена',
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
