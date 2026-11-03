import { beforeAll, describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreTagTagName } from '~shared/constants'
import { AltCoreTag } from '~core/ui/tag'
import { EAltCoreTagVariant } from '~core/ui/tag/models/types/external'
import { EAltSizes } from '~shared/types/global'
import type { IAltIcon } from '~shared/icons'

import { AltTag } from '~ng/ui/tag'
import { type IAltNgTagProps } from '~ng/ui/tag/models/types'
import { propsLocatorTestCases } from '~ng/ui/tag/tests/cases/css.ts'

interface ICreateComponentArgs {
  props?: Partial<IAltNgTagProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltTag] }).compileComponents()

  @Component({
    template: `
      <AltTag 
        [size]="size" 
        [variant]="variant" 
        [disabled]="disabled" 
        [iconLeft]="iconLeft"
        [locator]="locator"
      >
        {{slotContent}}
      </AltTag>
    `,
    imports: [AltTag],
    standalone: true,
  })
  class TestComponent {
    size = props?.size
    variant = props?.variant
    disabled = props?.disabled
    iconLeft = props?.iconLeft
    locator = props?.locator
    slotContent = 'Test tag'
  }
  return TestComponent
}

const tagName = AltCoreTagTagName

describe(
  'Angular/AltTag',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreTag,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of propsLocatorTestCases) {
          it(
            `Prop: "${testCase.prop}" ${typeof testCase.value === 'object' ? JSON.stringify(testCase.value) : testCase.value} should ${testCase.value === undefined ? 'not' : ''} set ${testCase.prop} on the core component`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

              expect(coreElement?.[testCase.prop]).toEqual(testCase.expected)
            },
          )
        }

        it(
          'Should pass size to the web component',
          async() => {
            const size = EAltSizes.SMALL
            const component = await createComponent({ props: { size } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            expect(coreElement?.size).toBe(size)
          },
        )

        it(
          'Should handle undefined size in the web component',
          async() => {
            const component = await createComponent({ props: { size: undefined } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            // Defaults to medium
            expect(coreElement?.size).toBe(EAltSizes.MEDIUM)
          },
        )

        it(
          'Should pass variant to the web component',
          async() => {
            const variant = EAltCoreTagVariant.DANGER
            const component = await createComponent({ props: { variant } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            expect(coreElement?.variant).toBe(variant)
          },
        )

        it(
          'Should handle undefined variant in the web component',
          async() => {
            const component = await createComponent({ props: { variant: undefined } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            // Defaults to accent
            expect(coreElement?.variant).toBe(EAltCoreTagVariant.ACCENT)
          },
        )

        it(
          'Should pass disabled to the web component',
          async() => {
            const disabled = true
            const component = await createComponent({ props: { disabled } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            expect(coreElement?.disabled).toBe(disabled)
          },
        )

        it(
          'Should handle undefined disabled in the web component',
          async() => {
            const component = await createComponent({ props: { disabled: undefined } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            // Defaults to false
            expect(coreElement?.disabled).toBe(false)
          },
        )

        it(
          'Should pass iconLeft to the web component',
          async() => {
            const iconLeft: IAltIcon = { name: 'check', data: '' }
            const component = await createComponent({ props: { iconLeft } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            expect(coreElement?.iconLeft).toEqual(iconLeft)
          },
        )

        it(
          'Should handle undefined iconLeft in the web component',
          async() => {
            const component = await createComponent({ props: { iconLeft: undefined } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            expect(coreElement?.iconLeft).toBeUndefined()
          },
        )
      },
    )
  },
)
