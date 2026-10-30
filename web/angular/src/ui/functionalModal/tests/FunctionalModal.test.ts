import { describe, expect, it } from 'vitest'
import { AltCoreFunctionalModalTagName as tagName } from '~shared/constants'
import { TestBed } from '~ng/tests/setup'
import { AltFunctionalModal } from '~ng/ui/functionalModal/FunctionalModal.component'
import { Component } from '@angular/core'
import type { IAltNgFunctionalModalProps } from '~ng/ui/functionalModal/models/types'

import {
  propsOpenTestCases,
  propsSizeTestCases,
  propsPreventEscapeTestCases,
  propsFullScreenTestCases,
  propsWidthTestCases,
  propsHideOverlayTestCases,
  propsHeadingTestCases,
  propsSubHeadingTestCases,
  propsHideFooterTestCases,
} from './cases/props'

interface ICreateComponentArgs {
  props?: Partial<IAltNgFunctionalModalProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltFunctionalModal] }).compileComponents()

  @Component({
    template: `
      <AltFunctionalModal
        [open]="open"
        [size]="size"
        [width]="width"
        [hideOverlay]="hideOverlay"
        [hideFooter]="hideFooter"
        [preventEscape]="preventEscape"
        [fullScreen]="fullScreen"
        [heading]="heading"
        [subHeading]="subHeading"
        [locale]="locale"
      >
      </AltFunctionalModal>
    `,
    imports: [AltFunctionalModal],
    standalone: true,
  })
  class TestComponent {
    open = props?.open
    size = props?.size
    width = props?.width
    hideOverlay = props?.hideOverlay
    hideFooter = props?.hideFooter
    preventEscape = props?.preventEscape
    fullScreen = props?.fullScreen
    heading = props?.heading
    subHeading = props?.subHeading
    locale = props?.locale
  }
  return TestComponent
}

describe('Angular/AltFunctionalModal/Unit', () => {
  describe(
    'Props',
    () => {
      for (const testCase of [
        ...propsOpenTestCases,
        ...propsSizeTestCases,
        ...propsPreventEscapeTestCases,
        ...propsFullScreenTestCases,
        ...propsWidthTestCases,
        ...propsHideOverlayTestCases,
        ...propsHeadingTestCases,
        ...propsSubHeadingTestCases,
        ...propsHideFooterTestCases,
      ]) {
        it(
          `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
          async() => {
            const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

            if (Array.isArray(testCase.value)) {
              expect(coreElement?.[testCase.prop]).toStrictEqual(testCase.expected)
            } else {
              expect(coreElement?.[testCase.prop]).toBe(testCase.expected)
            }
          },
        )
      }
    },
  )
})
