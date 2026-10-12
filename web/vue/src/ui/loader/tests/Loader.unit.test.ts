import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { TYCoreLoaderSize } from '~core/ui/loader/models/types'
import { EYCoreLoaderVariant } from '~core/ui/loader/models/types'

import { YCoreLoaderTagName } from '~shared/constants'
import { EYSizes } from '~shared/types/global'

import { createVueLoaderProps } from '~web/vue/src/ui/loader/models/types'
import { YLoader } from '~vue/ui/loader'

const tagName = YCoreLoaderTagName

const {
  size: defaultSize,
  variant: defaultVariant,
} = createVueLoaderProps()

describe(
  'Vue/YLoader',
  () => {
    describe(
      'Props',
      () => {
        for (const { size, expectedResult } of [
          { size: undefined, expectedResult: defaultSize },
          { size: EYSizes.SMALL, expectedResult: EYSizes.SMALL },
          { size: EYSizes.MEDIUM, expectedResult: EYSizes.MEDIUM },
          { size: EYSizes.LARGE, expectedResult: EYSizes.LARGE },
        ]) {
          it(
            `Должен передать size со значением "${size}" в Web Component`,
            () => {
              // Arrange
              const wrapper = mount(
                YLoader,
                { props: { size: size as TYCoreLoaderSize } },
              )

              const component = wrapper.find(tagName)

              // Assert
              expect(component.element.size).toBe(expectedResult)
            },
          )
        }

        for (const { variant, expectedResult } of [
          { variant: undefined, expectedResult: defaultVariant },
          { variant: EYCoreLoaderVariant.BLACK, expectedResult: EYCoreLoaderVariant.BLACK },
          { variant: EYCoreLoaderVariant.WHITE, expectedResult: EYCoreLoaderVariant.WHITE },
          { variant: EYCoreLoaderVariant.YELLOW, expectedResult: EYCoreLoaderVariant.YELLOW },
        ]) {
          it(
            `Должен передать variant со значением "${variant}" в Web Component`,
            () => {
              // Arrange
              const wrapper = mount(
                YLoader,
                { props: { variant } },
              )

              const component = wrapper.find(tagName)

              // Assert
              expect(component.element.variant).toBe(expectedResult)
            },
          )
        }
      },
    )
  },
)
