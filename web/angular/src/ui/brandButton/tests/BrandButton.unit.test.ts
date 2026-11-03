import { describe, it, expect, vi } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltBrandButton } from '~ng/ui/brandButton'
import { type IAltNgBrandButtonProps, type TAltNgBrandButtonClickEvent } from '~ng/ui/brandButton/models/types'
import {
  propSizeTestCases,
  propVariantTestCases,
  propDisabledTestCases,
  propLoadingTestCases,
  propTextTestCases,
} from './cases/props'
import { dispatchEvent } from '~shared/tests/utils'

const tagName = 'alt-core-brand-button'

interface ICreateComponentArgs {
  props?: Partial<IAltNgBrandButtonProps>
  onClick?: (e: TAltNgBrandButtonClickEvent) => void
}

const createComponent = async({ props, onClick }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltBrandButton] }).compileComponents()

  @Component({
    template: `
      <AltBrandButton
        [variant]="variant"
        [text]="text"
        [disabled]="disabled"
        [loading]="loading"
        [size]="size"
        (click)="onClick($event)"
      ></AltBrandButton>
    `,
    imports: [AltBrandButton],
    standalone: true,
  })
  class TestComponent {
    variant = props?.variant
    text = props?.text
    disabled = props?.disabled
    loading = props?.loading
    size = props?.size
    onClick = onClick ?? (() => ({}))
  }

  return TestComponent
}

describe('Angular/AltBrandButton', () => {
  describe('Unit', () => {
    describe('Props', () => {
      for (const testCase of [
        ...propSizeTestCases,
        ...propVariantTestCases,
        ...propDisabledTestCases,
        ...propLoadingTestCases,
        ...propTextTestCases,
      ]) {
        it(
          `Prop "${testCase.prop}" should be "${testCase.case}"`,
          async() => {
            const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

            expect(JSON.stringify(coreElement?.[testCase.prop])).toBe(JSON.stringify(testCase.expected))
          },
        )
      }
    })

    describe('Events', () => {
      it('Should emit click', async() => {
        const onClickSpy = vi.fn()
        const component = await createComponent({ props: { text: 'DEFAULT' } })
        const fixture = TestBed.createComponent(component)
        fixture.detectChanges()

        await fixture.whenStable()
        const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName) as HTMLElement

        coreElement.addEventListener(
          'click',
          onClickSpy,
        )

        dispatchEvent(
          coreElement,
          'click',
          {
            bubbles: true,
            cancelable: true,
          },
        )

        expect(onClickSpy).toHaveBeenCalledTimes(1)
      })
    })
  })
})
