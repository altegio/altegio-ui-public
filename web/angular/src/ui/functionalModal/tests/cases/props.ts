import { text, empty } from '~shared/tests/slotContents'
import type {
  IYCoreFunctionalModalProps,
} from '~core/ui/functionalModal/models/types'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

export const propsOpenTestCases: TPropTestCase<IYCoreFunctionalModalProps, 'open'>[] = [
  { prop: 'open', case: 'true', value: true, expected: true },
  { prop: 'open', case: 'false', value: false, expected: false },
]

export const propsSizeTestCases: TPropTestCase<IYCoreFunctionalModalProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: 'large', value: EYSizes.LARGE, expected: EYSizes.LARGE },
]

export const propsWidthTestCases: TPropTestCase<IYCoreFunctionalModalProps, 'width'>[] = [
  { prop: 'width', case: '100px', value: '100px', expected: '100px' },
  { prop: 'width', case: '200px', value: '200px', expected: '200px' },
]

export const propsPreventEscapeTestCases: TPropTestCase<IYCoreFunctionalModalProps, 'preventEscape'>[] = [
  { prop: 'preventEscape', case: 'true', value: true, expected: true },
  { prop: 'preventEscape', case: 'false', value: false, expected: false },
]

export const propsHideOverlayTestCases: TPropTestCase<IYCoreFunctionalModalProps, 'hideOverlay'>[] = [
  { prop: 'hideOverlay', case: 'true', value: true, expected: true },
  { prop: 'hideOverlay', case: 'false', value: false, expected: false },
]

export const propsFullScreenTestCases: TPropTestCase<IYCoreFunctionalModalProps, 'fullScreen'>[] = [
  { prop: 'fullScreen', case: 'true', value: true, expected: true },
  { prop: 'fullScreen', case: 'false', value: false, expected: false },
]

export const propsHeadingTestCases: TPropTestCase<IYCoreFunctionalModalProps, 'heading'>[] = [
  { prop: 'heading', case: 'with a heading', value: text, expected: text },
  { prop: 'heading', case: 'without a heading', value: empty, expected: empty },
]

export const propsSubHeadingTestCases: TPropTestCase<IYCoreFunctionalModalProps, 'subHeading'>[] = [
  { prop: 'subHeading', case: 'with a subheading', value: text, expected: text },
  { prop: 'subHeading', case: 'without a subheading', value: empty, expected: empty },
]

export const propsHideFooterTestCases: TPropTestCase<IYCoreFunctionalModalProps, 'hideFooter'>[] = [
  { prop: 'hideFooter', case: 'hide', value: true, expected: true },
  { prop: 'hideFooter', case: 'not hide', value: false, expected: false },
]

