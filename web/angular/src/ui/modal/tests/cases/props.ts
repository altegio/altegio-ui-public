import {
  EAltCoreModalVariant,
} from '~core/ui/modal/models/types'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import { createNgModalProps, type IAltNgModalProps } from '~ng/ui/modal/models/types'

const defaultProps = createNgModalProps()

export const propsOpenTestCases: TPropTestCase<IAltNgModalProps, 'open'>[] = [
  { prop: 'open', case: 'true', value: true, expected: true },
  { prop: 'open', case: 'false', value: false, expected: false },
  { prop: 'open', case: 'undefined', value: undefined, expected: defaultProps.open },
]

export const propsSizeTestCases: TPropTestCase<IAltNgModalProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE, expected: EAltSizes.LARGE },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultProps.size },
]

export const propsVariantTestCases: TPropTestCase<IAltNgModalProps, 'variant'>[] = [
  { prop: 'variant', case: 'primary', value: EAltCoreModalVariant.PRIMARY, expected: EAltCoreModalVariant.PRIMARY },
  { prop: 'variant', case: 'secondary', value: EAltCoreModalVariant.SECONDARY, expected: EAltCoreModalVariant.SECONDARY },
  { prop: 'variant', case: 'undefined', value: undefined, expected: defaultProps.variant },
]

export const propsWidthTestCases: TPropTestCase<IAltNgModalProps, 'width'>[] = [
  { prop: 'width', case: '100px', value: '100px', expected: '100px' },
  { prop: 'width', case: '200px', value: '200px', expected: '200px' },
  { prop: 'width', case: 'undefined', value: undefined, expected: defaultProps.width },
]

export const propsPreventEscapeTestCases: TPropTestCase<IAltNgModalProps, 'preventEscape'>[] = [
  { prop: 'preventEscape', case: 'true', value: true, expected: true },
  { prop: 'preventEscape', case: 'false', value: false, expected: false },
  { prop: 'preventEscape', case: 'undefined', value: undefined, expected: defaultProps.preventEscape },
]

export const propsHideOverlayTestCases: TPropTestCase<IAltNgModalProps, 'hideOverlay'>[] = [
  { prop: 'hideOverlay', case: 'true', value: true, expected: true },
  { prop: 'hideOverlay', case: 'false', value: false, expected: false },
  { prop: 'hideOverlay', case: 'undefined', value: undefined, expected: defaultProps.hideOverlay },
]

export const propsFullScreenTestCases: TPropTestCase<IAltNgModalProps, 'fullScreen'>[] = [
  { prop: 'fullScreen', case: 'true', value: true, expected: true },
  { prop: 'fullScreen', case: 'false', value: false, expected: false },
  { prop: 'fullScreen', case: 'undefined', value: undefined, expected: defaultProps.fullScreen },
]
