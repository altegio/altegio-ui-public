import {
  EYCoreModalVariant,
} from '~core/ui/modal/models/types'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import { createNgModalProps, type IYNgModalProps } from '~ng/ui/modal/models/types'

const defaultProps = createNgModalProps()

export const propsOpenTestCases: TPropTestCase<IYNgModalProps, 'open'>[] = [
  { prop: 'open', case: 'true', value: true, expected: true },
  { prop: 'open', case: 'false', value: false, expected: false },
  { prop: 'open', case: 'undefined', value: undefined, expected: defaultProps.open },
]

export const propsSizeTestCases: TPropTestCase<IYNgModalProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: 'large', value: EYSizes.LARGE, expected: EYSizes.LARGE },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultProps.size },
]

export const propsVariantTestCases: TPropTestCase<IYNgModalProps, 'variant'>[] = [
  { prop: 'variant', case: 'primary', value: EYCoreModalVariant.PRIMARY, expected: EYCoreModalVariant.PRIMARY },
  { prop: 'variant', case: 'secondary', value: EYCoreModalVariant.SECONDARY, expected: EYCoreModalVariant.SECONDARY },
  { prop: 'variant', case: 'undefined', value: undefined, expected: defaultProps.variant },
]

export const propsWidthTestCases: TPropTestCase<IYNgModalProps, 'width'>[] = [
  { prop: 'width', case: '100px', value: '100px', expected: '100px' },
  { prop: 'width', case: '200px', value: '200px', expected: '200px' },
  { prop: 'width', case: 'undefined', value: undefined, expected: defaultProps.width },
]

export const propsPreventEscapeTestCases: TPropTestCase<IYNgModalProps, 'preventEscape'>[] = [
  { prop: 'preventEscape', case: 'true', value: true, expected: true },
  { prop: 'preventEscape', case: 'false', value: false, expected: false },
  { prop: 'preventEscape', case: 'undefined', value: undefined, expected: defaultProps.preventEscape },
]

export const propsHideOverlayTestCases: TPropTestCase<IYNgModalProps, 'hideOverlay'>[] = [
  { prop: 'hideOverlay', case: 'true', value: true, expected: true },
  { prop: 'hideOverlay', case: 'false', value: false, expected: false },
  { prop: 'hideOverlay', case: 'undefined', value: undefined, expected: defaultProps.hideOverlay },
]

export const propsFullScreenTestCases: TPropTestCase<IYNgModalProps, 'fullScreen'>[] = [
  { prop: 'fullScreen', case: 'true', value: true, expected: true },
  { prop: 'fullScreen', case: 'false', value: false, expected: false },
  { prop: 'fullScreen', case: 'undefined', value: undefined, expected: defaultProps.fullScreen },
]
