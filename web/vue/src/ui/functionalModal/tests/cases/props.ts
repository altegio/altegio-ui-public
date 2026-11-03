import { text, empty } from '~shared/tests/slotContents'
import type {
  IAltVueFunctionalModalProps,
} from '~vue/ui/functionalModal/models/types'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

export const propsOpenTestCases: TPropTestCase<IAltVueFunctionalModalProps, 'modelValue'>[] = [
  { prop: 'modelValue', case: 'true', value: true, expected: true },
  { prop: 'modelValue', case: 'false', value: false, expected: false },
]

export const propsSizeTestCases: TPropTestCase<IAltVueFunctionalModalProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE, expected: EAltSizes.LARGE },
]

export const propsWidthTestCases: TPropTestCase<IAltVueFunctionalModalProps, 'width'>[] = [
  { prop: 'width', case: '100px', value: '100px', expected: '100px' },
  { prop: 'width', case: '200px', value: '200px', expected: '200px' },
]

export const propsPreventEscapeTestCases: TPropTestCase<IAltVueFunctionalModalProps, 'preventEscape'>[] = [
  { prop: 'preventEscape', case: 'true', value: true, expected: true },
  { prop: 'preventEscape', case: 'false', value: false, expected: false },
]

export const propsHideOverlayTestCases: TPropTestCase<IAltVueFunctionalModalProps, 'hideOverlay'>[] = [
  { prop: 'hideOverlay', case: 'true', value: true, expected: true },
  { prop: 'hideOverlay', case: 'false', value: false, expected: false },
]

export const propsFullScreenTestCases: TPropTestCase<IAltVueFunctionalModalProps, 'fullScreen'>[] = [
  { prop: 'fullScreen', case: 'true', value: true, expected: true },
  { prop: 'fullScreen', case: 'false', value: false, expected: false },
]

export const propsHeadingTestCases: TPropTestCase<IAltVueFunctionalModalProps, 'heading'>[] = [
  { prop: 'heading', case: 'with a heading', value: text, expected: text },
  { prop: 'heading', case: 'without a heading', value: empty, expected: empty },
]

export const propsSubHeadingTestCases: TPropTestCase<IAltVueFunctionalModalProps, 'subHeading'>[] = [
  { prop: 'subHeading', case: 'with a subheading', value: text, expected: text },
  { prop: 'subHeading', case: 'without a subheading', value: empty, expected: empty },
]

export const propsHideFooterTestCases: TPropTestCase<IAltVueFunctionalModalProps, 'hideFooter'>[] = [
  { prop: 'hideFooter', case: 'hide', value: true, expected: true },
  { prop: 'hideFooter', case: 'not hide', value: false, expected: false },
]

