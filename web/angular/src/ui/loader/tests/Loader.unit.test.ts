import { Component } from '@angular/core'
import { describe, expect, it } from 'vitest'

import { TestBed } from '~ng/tests/setup'

import type { TAltCoreLoaderSize } from '~core/ui/loader/models/types'
import { EAltCoreLoaderVariant } from '~core/ui/loader/models/types'

import { AltCoreLoaderTagName } from '~shared/constants'
import { EAltSizes } from '~shared/types/global'

import { createNgLoaderProps, type IAltNgLoaderProps } from '~ng/ui/loader/models/types'
import { AltLoader } from '~ng/ui/loader'

interface ICreateComponentArgs {
  props: Partial<IAltNgLoaderProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltLoader] }).compileComponents()

  @Component({
    template: `
      <AltLoader [size]="size" [variant]="variant" />
    `,
    imports: [AltLoader],
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

const tagName = AltCoreLoaderTagName

describe(
  'Angular/AltLoader',
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
            async() => {
              // Arrange
              const component = await createComponent({ props: { size: size as TAltCoreLoaderSize } })
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
          { variant: EAltCoreLoaderVariant.BLACK, expectedResult: EAltCoreLoaderVariant.BLACK },
          { variant: EAltCoreLoaderVariant.WHITE, expectedResult: EAltCoreLoaderVariant.WHITE },
          { variant: EAltCoreLoaderVariant.YELLOW, expectedResult: EAltCoreLoaderVariant.YELLOW },
        ]) {
          it(
            `Should pass variant "${variant}" to the web component`,
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
