import { describe, expect, it } from 'vitest'
import { YCoreFunctionalModalTagName as tagName } from '~shared/constants'
import { TestBed } from '~ng/tests/setup'
import { YFunctionalModal } from '~ng/ui/functionalModal/FunctionalModal.component'
import { Component } from '@angular/core'
import type { IYNgFunctionalModalProps } from '~ng/ui/functionalModal/models/types'

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
  props?: Partial<IYNgFunctionalModalProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YFunctionalModal] }).compileComponents()

  @Component({
    template: `
      <YFunctionalModal
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
      </YFunctionalModal>
    `,
    imports: [YFunctionalModal],
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

describe('Angular/YFunctionalModal/Unit', () => {
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
          `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
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
