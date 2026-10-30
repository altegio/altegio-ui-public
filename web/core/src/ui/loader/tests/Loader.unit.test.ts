import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'

import { AltCoreLoaderTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  classWithModifier,
  getElementClasses,
  getShadowRootElement,
} from '~shared/tests/utils'
import { EAltSizes } from '~shared/types/global'

import '~core/ui/loader'

import type { TAltCoreLoaderSize } from '~core/ui/loader/models/types'
import {
  EAltCoreLoaderVariant,
  createCoreLoaderProps,
} from '~core/ui/loader/models/types'

const tagName = AltCoreLoaderTagName

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
  'Core/AltCoreLoader/Unit',
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
          EAltSizes.SMALL,
          EAltSizes.MEDIUM,
          EAltSizes.LARGE,
        ]) {
          const expectedCssClass = localClassWithModifier(`size_${size}`)

          it(
            `Input size with value "${size}" should set the style class "${expectedCssClass}"`,
            async() => {
              // Arrange
              await updateComponent({ props: { size: size as TAltCoreLoaderSize } })

              const rootElement = getLocalRootElement()
              const rootElementClasses = getElementClasses(rootElement)

              // Assert
              expect(rootElementClasses).toContain(expectedCssClass)
            },
          )
        }

        for (const variant of [
          EAltCoreLoaderVariant.BLACK,
          EAltCoreLoaderVariant.WHITE,
          EAltCoreLoaderVariant.YELLOW,
        ]) {
          const expectedCssClass = localClassWithModifier(`variant_${variant}`)

          it(
            `Input variant with value "${variant}" should set the style class "${expectedCssClass}"`,
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
            `Input "${testCase.prop}" with value "${testCase.value}" should not set a style class`,
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
