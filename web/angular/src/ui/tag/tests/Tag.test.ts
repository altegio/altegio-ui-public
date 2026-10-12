import { beforeAll, describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreTagTagName } from '~shared/constants'
import { YCoreTag } from '~core/ui/tag'
import { EYCoreTagVariant } from '~core/ui/tag/models/types/external'
import { EYSizes } from '~shared/types/global'
import type { IYIcon } from '~shared/icons'

import { YTag } from '~ng/ui/tag'
import { type IYNgTagProps } from '~ng/ui/tag/models/types'
import { propsLocatorTestCases } from '~ng/ui/tag/tests/cases/css.ts'

interface ICreateComponentArgs {
  props?: Partial<IYNgTagProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YTag] }).compileComponents()

  @Component({
    template: `
      <YTag 
        [size]="size" 
        [variant]="variant" 
        [disabled]="disabled" 
        [iconLeft]="iconLeft"
        [locator]="locator"
      >
        {{slotContent}}
      </YTag>
    `,
    imports: [YTag],
    standalone: true,
  })
  class TestComponent {
    size = props?.size
    variant = props?.variant
    disabled = props?.disabled
    iconLeft = props?.iconLeft
    locator = props?.locator
    slotContent = 'Тестовый тег'
  }
  return TestComponent
}

const tagName = YCoreTagTagName

describe(
  'Angular/YTag',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreTag,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of propsLocatorTestCases) {
          it(
            `Prop: "${testCase.prop}" ${typeof testCase.value === 'object' ? JSON.stringify(testCase.value) : testCase.value} ${testCase.value === undefined ? 'не' : ''} должен изменить свойство ${testCase.prop} у core компонента`,
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
          'Должен корректно передать size в Web Component',
          async() => {
            const size = EYSizes.SMALL
            const component = await createComponent({ props: { size } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            expect(coreElement?.size).toBe(size)
          },
        )

        it(
          'Должен корректно обработать undefined size в Web Component',
          async() => {
            const component = await createComponent({ props: { size: undefined } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            // По умолчанию должен быть medium
            expect(coreElement?.size).toBe(EYSizes.MEDIUM)
          },
        )

        it(
          'Должен корректно передать variant в Web Component',
          async() => {
            const variant = EYCoreTagVariant.DANGER
            const component = await createComponent({ props: { variant } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            expect(coreElement?.variant).toBe(variant)
          },
        )

        it(
          'Должен корректно обработать undefined variant в Web Component',
          async() => {
            const component = await createComponent({ props: { variant: undefined } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            // По умолчанию должен быть accent
            expect(coreElement?.variant).toBe(EYCoreTagVariant.ACCENT)
          },
        )

        it(
          'Должен корректно передать disabled в Web Component',
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
          'Должен корректно обработать undefined disabled в Web Component',
          async() => {
            const component = await createComponent({ props: { disabled: undefined } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            // По умолчанию должен быть false
            expect(coreElement?.disabled).toBe(false)
          },
        )

        it(
          'Должен корректно передать iconLeft в Web Component',
          async() => {
            const iconLeft: IYIcon = { name: 'check', data: '' }
            const component = await createComponent({ props: { iconLeft } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            expect(coreElement?.iconLeft).toEqual(iconLeft)
          },
        )

        it(
          'Должен корректно обработать undefined iconLeft в Web Component',
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
