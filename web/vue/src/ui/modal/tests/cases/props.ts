import {
  EAltCoreModalVariant,
} from '~core/ui/modal/models/types'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import { createVueModalProps, type IAltVueCoreModalProps, type IAltVueModalProps } from '~vue/ui/modal/models/types'

const defaultProps = createVueModalProps() as IAltVueModalProps

export const propsOpenTestCases: TPropTestCase<IAltVueCoreModalProps, 'modelValue'>[] = [
  { prop: 'modelValue', case: 'true', value: true, expected: true },
  { prop: 'modelValue', case: 'false', value: false, expected: false },
  { prop: 'modelValue', case: 'undefined', value: undefined, expected: defaultProps.modelValue },
]

export const propsSizeTestCases: TPropTestCase<IAltVueCoreModalProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE, expected: EAltSizes.LARGE },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultProps.size },
]

export const propsVariantTestCases: TPropTestCase<IAltVueCoreModalProps, 'variant'>[] = [
  { prop: 'variant', case: 'primary', value: EAltCoreModalVariant.PRIMARY, expected: EAltCoreModalVariant.PRIMARY },
  { prop: 'variant', case: 'secondary', value: EAltCoreModalVariant.SECONDARY, expected: EAltCoreModalVariant.SECONDARY },
  { prop: 'variant', case: 'undefined', value: undefined, expected: defaultProps.variant },
]

export const propsWidthTestCases: TPropTestCase<IAltVueCoreModalProps, 'width'>[] = [
  { prop: 'width', case: '100px', value: '100px', expected: '100px' },
  { prop: 'width', case: '200px', value: '200px', expected: '200px' },
  { prop: 'width', case: 'undefined', value: undefined, expected: defaultProps.width },
]

export const propsPreventEscapeTestCases: TPropTestCase<IAltVueCoreModalProps, 'preventEscape'>[] = [
  { prop: 'preventEscape', case: 'true', value: true, expected: true },
  { prop: 'preventEscape', case: 'false', value: false, expected: false },
  { prop: 'preventEscape', case: 'undefined', value: undefined, expected: defaultProps.preventEscape },
]

export const propsHideOverlayTestCases: TPropTestCase<IAltVueCoreModalProps, 'hideOverlay'>[] = [
  { prop: 'hideOverlay', case: 'true', value: true, expected: true },
  { prop: 'hideOverlay', case: 'false', value: false, expected: false },
  { prop: 'hideOverlay', case: 'undefined', value: undefined, expected: defaultProps.hideOverlay },
]

export const propsFullScreenTestCases: TPropTestCase<IAltVueCoreModalProps, 'fullScreen'>[] = [
  { prop: 'fullScreen', case: 'true', value: true, expected: true },
  { prop: 'fullScreen', case: 'false', value: false, expected: false },
  { prop: 'fullScreen', case: 'undefined', value: undefined, expected: defaultProps.fullScreen },
]
