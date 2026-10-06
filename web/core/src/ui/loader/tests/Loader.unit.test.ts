import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'

import { YCoreLoaderTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  classWithModifier,
  getElementClasses,
  getShadowRootElement,
} from '~shared/tests/utils'
import { EYSizes } from '~shared/types/global'

import '~core/ui/loader'

import type { TYCoreLoaderSize } from '~core/ui/loader/models/types'
import {
  EYCoreLoaderVariant,
  createCoreLoaderProps,
} from '~core/ui/loader/models/types'

const tagName = YCoreLoaderTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreLoaderProps(),
)

const getLocalRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

const localClassWithModifier = (modifier: string) => classWithModifier(
  tagName,
  modifier,
)

describe(
  'Core/YCoreLoader/Unit',
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
      'Props',
      () => {
        for (const size of [
          EYSizes.SMALL,
          EYSizes.MEDIUM,
          EYSizes.LARGE,
        ]) {
          const expectedCssClass = localClassWithModifier(`size_${size}`)

          it(
            `Входящий параметр size со значением "${size}" должен установить класс стилей "${expectedCssClass}"`,
            async() => {
              // Arrange
              await updateComponent({ props: { size: size as TYCoreLoaderSize } })

              const rootElement = getLocalRootElement()
              const rootElementClasses = getElementClasses(rootElement)

              // Assert
              expect(rootElementClasses).toContain(expectedCssClass)
            },
          )
        }

        for (const variant of [
          EYCoreLoaderVariant.BLACK,
          EYCoreLoaderVariant.WHITE,
          EYCoreLoaderVariant.YELLOW,
        ]) {
          const expectedCssClass = localClassWithModifier(`variant_${variant}`)

          it(
            `Входящий параметр variant со значением "${variant}" должен установить класс стилей "${expectedCssClass}"`,
            async() => {
              // Arrange
              await updateComponent({ props: { variant } })

              const rootElement = getLocalRootElement()
              const rootElementClasses = getElementClasses(rootElement)

              // Assert
              expect(rootElementClasses).toContain(expectedCssClass)
            },
          )
        }

        for (const testCase of [
          { prop: 'size', value: undefined },
          { prop: 'variant', value: undefined },
        ]) {
          const expectedCssClass = localClassWithModifier(`${testCase.prop}_${testCase.value}`)

          it(
            `Входящий параметр "${testCase.prop}" со значением "${testCase.value}" не должен устанавливать класс стилей`,
            async() => {
              // Arrange
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getLocalRootElement()
              const rootElementClasses = getElementClasses(rootElement)

              // Assert
              expect(rootElementClasses).not.toContain(expectedCssClass)
            },
          )
        }
      },
    )
  },
)
