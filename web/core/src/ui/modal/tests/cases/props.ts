import type {
  IAltCoreModalProps,
} from '~core/ui/modal/models/types'
import {
  EAltCoreModalVariant,
} from '~core/ui/modal/models/types'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

export const propsOpenTestCases: TPropTestCase<IAltCoreModalProps, 'open'>[] = [
  { prop: 'open', case: 'true', value: true, expected: true },
  { prop: 'open', case: 'false', value: false, expected: false },
]

export const propsSizeTestCases: TPropTestCase<IAltCoreModalProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE, expected: EAltSizes.LARGE },
]

export const propsVariantTestCases: TPropTestCase<IAltCoreModalProps, 'variant'>[] = [
  { prop: 'variant', case: 'primary', value: EAltCoreModalVariant.PRIMARY, expected: EAltCoreModalVariant.PRIMARY },
  { prop: 'variant', case: 'secondary', value: EAltCoreModalVariant.SECONDARY, expected: EAltCoreModalVariant.SECONDARY },
]

export const propsWidthTestCases: TPropTestCase<IAltCoreModalProps, 'width'>[] = [
  { prop: 'width', case: '100px', value: '100px', expected: '100px' },
  { prop: 'width', case: '200px', value: '200px', expected: '200px' },
]

export const propsPreventEscapeTestCases: TPropTestCase<IAltCoreModalProps, 'preventEscape'>[] = [
  { prop: 'preventEscape', case: 'true', value: true, expected: true },
  { prop: 'preventEscape', case: 'false', value: false, expected: false },
]

export const propsHideOverlayTestCases: TPropTestCase<IAltCoreModalProps, 'hideOverlay'>[] = [
  { prop: 'hideOverlay', case: 'true', value: true, expected: true },
  { prop: 'hideOverlay', case: 'false', value: false, expected: false },
]

export const propsFullScreenTestCases: TPropTestCase<IAltCoreModalProps, 'fullScreen'>[] = [
  { prop: 'fullScreen', case: 'true', value: true, expected: true },
  { prop: 'fullScreen', case: 'false', value: false, expected: false },
]
