import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { TAltCoreLoaderSize } from '~core/ui/loader/models/types'
import { EAltCoreLoaderVariant } from '~core/ui/loader/models/types'

import { AltCoreLoaderTagName } from '~shared/constants'
import { EAltSizes } from '~shared/types/global'

import { createVueLoaderProps } from '~web/vue/src/ui/loader/models/types'
import { AltLoader } from '~vue/ui/loader'

const tagName = AltCoreLoaderTagName

const {
  size: defaultSize,
  variant: defaultVariant,
} = createVueLoaderProps()

describe(
  'Vue/AltLoader',
  () => {
    describe(
      'Props',
      () => {
        for (const { size, expectedResult } of [
          { size: undefined, expectedResult: defaultSize },
          { size: EAltSizes.SMALL, expectedResult: EAltSizes.SMALL },
          { size: EAltSizes.MEDIUM, expectedResult: EAltSizes.MEDIUM },
          { size: EAltSizes.LARGE, expectedResult: EAltSizes.LARGE },
        ]) {
          it(
            `Should pass size "${size}" to the web component`,
            () => {
              // Arrange
              const wrapper = mount(
                AltLoader,
                { props: { size: size as TAltCoreLoaderSize } },
              )

              const component = wrapper.find(tagName)

              // Assert
              expect(component.element.size).toBe(expectedResult)
            },
          )
        }

        for (const { variant, expectedResult } of [
          { variant: undefined, expectedResult: defaultVariant },
          { variant: EAltCoreLoaderVariant.BLACK, expectedResult: EAltCoreLoaderVariant.BLACK },
          { variant: EAltCoreLoaderVariant.WHITE, expectedResult: EAltCoreLoaderVariant.WHITE },
          { variant: EAltCoreLoaderVariant.YELLOW, expectedResult: EAltCoreLoaderVariant.YELLOW },
        ]) {
          it(
            `Should pass variant "${variant}" to the web component`,
            () => {
              // Arrange
              const wrapper = mount(
                AltLoader,
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
