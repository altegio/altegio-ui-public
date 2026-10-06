import { Component } from '@angular/core'
import { describe, expect, it } from 'vitest'

import { TestBed } from '~ng/tests/setup'

import type { TYCoreLoaderSize } from '~core/ui/loader/models/types'
import { EYCoreLoaderVariant } from '~core/ui/loader/models/types'

import { YCoreLoaderTagName } from '~shared/constants'
import { EYSizes } from '~shared/types/global'

import { createNgLoaderProps, type IYNgLoaderProps } from '~ng/ui/loader/models/types'
import { YLoader } from '~ng/ui/loader'

interface ICreateComponentArgs {
  props: Partial<IYNgLoaderProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YLoader] }).compileComponents()

  @Component({
    template: `
      <YLoader [size]="size" [variant]="variant" />
    `,
    imports: [YLoader],
    standalone: true,
  })

  class TestComponent {
    size = props.size
    variant = props.variant
  }

  return TestComponent
}

const {
  size: defaultSize,
  variant: defaultVariant,
} = createNgLoaderProps()

const tagName = YCoreLoaderTagName

describe(
  'Angular/YLoader',
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
            async() => {
              // Arrange
              const component = await createComponent({ props: { size: size as TYCoreLoaderSize } })
              const fixture = TestBed.createComponent(component)

              fixture.detectChanges()
              await fixture.whenStable()

              // Assert
              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
              expect(coreElement?.size).toBe(expectedResult)
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
            async() => {
              // Arrange
              const component = await createComponent({ props: { variant } })
              const fixture = TestBed.createComponent(component)

              fixture.detectChanges()
              await fixture.whenStable()

              // Assert
              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
              expect(coreElement?.variant).toBe(expectedResult)
            },
          )
        }
      },
    )
  },
)
