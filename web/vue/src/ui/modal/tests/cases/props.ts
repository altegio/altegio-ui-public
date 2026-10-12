import {
  EYCoreModalVariant,
} from '~core/ui/modal/models/types'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import { createVueModalProps, type IYVueCoreModalProps, type IYVueModalProps } from '~vue/ui/modal/models/types'

const defaultProps = createVueModalProps() as IYVueModalProps

export const propsOpenTestCases: TPropTestCase<IYVueCoreModalProps, 'modelValue'>[] = [
  { prop: 'modelValue', case: 'true', value: true, expected: true },
  { prop: 'modelValue', case: 'false', value: false, expected: false },
  { prop: 'modelValue', case: 'undefined', value: undefined, expected: defaultProps.modelValue },
]

export const propsSizeTestCases: TPropTestCase<IYVueCoreModalProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: 'large', value: EYSizes.LARGE, expected: EYSizes.LARGE },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultProps.size },
]

export const propsVariantTestCases: TPropTestCase<IYVueCoreModalProps, 'variant'>[] = [
  { prop: 'variant', case: 'primary', value: EYCoreModalVariant.PRIMARY, expected: EYCoreModalVariant.PRIMARY },
  { prop: 'variant', case: 'secondary', value: EYCoreModalVariant.SECONDARY, expected: EYCoreModalVariant.SECONDARY },
  { prop: 'variant', case: 'undefined', value: undefined, expected: defaultProps.variant },
]

export const propsWidthTestCases: TPropTestCase<IYVueCoreModalProps, 'width'>[] = [
  { prop: 'width', case: '100px', value: '100px', expected: '100px' },
  { prop: 'width', case: '200px', value: '200px', expected: '200px' },
  { prop: 'width', case: 'undefined', value: undefined, expected: defaultProps.width },
]

export const propsPreventEscapeTestCases: TPropTestCase<IYVueCoreModalProps, 'preventEscape'>[] = [
  { prop: 'preventEscape', case: 'true', value: true, expected: true },
  { prop: 'preventEscape', case: 'false', value: false, expected: false },
  { prop: 'preventEscape', case: 'undefined', value: undefined, expected: defaultProps.preventEscape },
]

export const propsHideOverlayTestCases: TPropTestCase<IYVueCoreModalProps, 'hideOverlay'>[] = [
  { prop: 'hideOverlay', case: 'true', value: true, expected: true },
  { prop: 'hideOverlay', case: 'false', value: false, expected: false },
  { prop: 'hideOverlay', case: 'undefined', value: undefined, expected: defaultProps.hideOverlay },
]

export const propsFullScreenTestCases: TPropTestCase<IYVueCoreModalProps, 'fullScreen'>[] = [
  { prop: 'fullScreen', case: 'true', value: true, expected: true },
  { prop: 'fullScreen', case: 'false', value: false, expected: false },
  { prop: 'fullScreen', case: 'undefined', value: undefined, expected: defaultProps.fullScreen },
]
