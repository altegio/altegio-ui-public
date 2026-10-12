import type {
  IYCoreModalProps,
} from '~core/ui/modal/models/types'
import {
  EYCoreModalVariant,
} from '~core/ui/modal/models/types'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

export const propsOpenTestCases: TPropTestCase<IYCoreModalProps, 'open'>[] = [
  { prop: 'open', case: 'true', value: true, expected: true },
  { prop: 'open', case: 'false', value: false, expected: false },
]

export const propsSizeTestCases: TPropTestCase<IYCoreModalProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: 'large', value: EYSizes.LARGE, expected: EYSizes.LARGE },
]

export const propsVariantTestCases: TPropTestCase<IYCoreModalProps, 'variant'>[] = [
  { prop: 'variant', case: 'primary', value: EYCoreModalVariant.PRIMARY, expected: EYCoreModalVariant.PRIMARY },
  { prop: 'variant', case: 'secondary', value: EYCoreModalVariant.SECONDARY, expected: EYCoreModalVariant.SECONDARY },
]

export const propsWidthTestCases: TPropTestCase<IYCoreModalProps, 'width'>[] = [
  { prop: 'width', case: '100px', value: '100px', expected: '100px' },
  { prop: 'width', case: '200px', value: '200px', expected: '200px' },
]

export const propsPreventEscapeTestCases: TPropTestCase<IYCoreModalProps, 'preventEscape'>[] = [
  { prop: 'preventEscape', case: 'true', value: true, expected: true },
  { prop: 'preventEscape', case: 'false', value: false, expected: false },
]

export const propsHideOverlayTestCases: TPropTestCase<IYCoreModalProps, 'hideOverlay'>[] = [
  { prop: 'hideOverlay', case: 'true', value: true, expected: true },
  { prop: 'hideOverlay', case: 'false', value: false, expected: false },
]

export const propsFullScreenTestCases: TPropTestCase<IYCoreModalProps, 'fullScreen'>[] = [
  { prop: 'fullScreen', case: 'true', value: true, expected: true },
  { prop: 'fullScreen', case: 'false', value: false, expected: false },
]
