import { text, empty } from '~shared/tests/slotContents'
import type {
  IAltCoreFunctionalModalProps,
} from '~core/ui/functionalModal/models/types'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

export const propsOpenTestCases: TPropTestCase<IAltCoreFunctionalModalProps, 'open'>[] = [
  { prop: 'open', case: 'true', value: true, expected: true },
  { prop: 'open', case: 'false', value: false, expected: false },
]

export const propsSizeTestCases: TPropTestCase<IAltCoreFunctionalModalProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE, expected: EAltSizes.LARGE },
]

export const propsWidthTestCases: TPropTestCase<IAltCoreFunctionalModalProps, 'width'>[] = [
  { prop: 'width', case: '100px', value: '100px', expected: '100px' },
  { prop: 'width', case: '200px', value: '200px', expected: '200px' },
]

export const propsPreventEscapeTestCases: TPropTestCase<IAltCoreFunctionalModalProps, 'preventEscape'>[] = [
  { prop: 'preventEscape', case: 'true', value: true, expected: true },
  { prop: 'preventEscape', case: 'false', value: false, expected: false },
]

export const propsHideOverlayTestCases: TPropTestCase<IAltCoreFunctionalModalProps, 'hideOverlay'>[] = [
  { prop: 'hideOverlay', case: 'true', value: true, expected: true },
  { prop: 'hideOverlay', case: 'false', value: false, expected: false },
]

export const propsFullScreenTestCases: TPropTestCase<IAltCoreFunctionalModalProps, 'fullScreen'>[] = [
  { prop: 'fullScreen', case: 'true', value: true, expected: true },
  { prop: 'fullScreen', case: 'false', value: false, expected: false },
]

export const propsHeadingTestCases: TPropTestCase<IAltCoreFunctionalModalProps, 'heading'>[] = [
  { prop: 'heading', case: 'with a heading', value: text, expected: text },
  { prop: 'heading', case: 'without a heading', value: empty, expected: empty },
]

export const propsSubHeadingTestCases: TPropTestCase<IAltCoreFunctionalModalProps, 'subHeading'>[] = [
  { prop: 'subHeading', case: 'with a subheading', value: text, expected: text },
  { prop: 'subHeading', case: 'without a subheading', value: empty, expected: undefined },
]

export const propsHideFooterTestCases: TPropTestCase<IAltCoreFunctionalModalProps, 'hideFooter'>[] = [
  { prop: 'hideFooter', case: 'hide', value: true },
  { prop: 'hideFooter', case: 'not hide', value: false },
]

