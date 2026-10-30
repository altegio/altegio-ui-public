import { EAltSizes } from '~shared/types/global'
import { AltCoreCardMainTagName as tagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import type { IAltCoreCardMainProps } from '../../models/types'

interface IAltCoreCardMainPropsHideSpaceLeftPropTestCase extends TPropTestCase<IAltCoreCardMainProps, 'hideSpaceLeft'> {
  expectedCssClass: string
}

interface IAltCoreCardMainPropsHideSpaceRightPropTestCase extends TPropTestCase<IAltCoreCardMainProps, 'hideSpaceRight'> {
  expectedCssClass: string
}

export const propDisabledCases: TPropTestCase<IAltCoreCardMainProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propSizeCases: TPropTestCase<IAltCoreCardMainProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE },
]
export const propHideSpaceLeftCases: IAltCoreCardMainPropsHideSpaceLeftPropTestCase[] = [
  { prop: 'hideSpaceLeft', case: 'true', value: true, expectedCssClass: `${tagName}_hide-space-left` },
  { prop: 'hideSpaceLeft', case: 'false', value: false, expectedCssClass: `${tagName}_hide-space-left` },
]
export const propHideSpaceRightCases: IAltCoreCardMainPropsHideSpaceRightPropTestCase[] = [
  { prop: 'hideSpaceRight', case: 'true', value: true, expectedCssClass: `${tagName}_hide-space-right` },
  { prop: 'hideSpaceRight', case: 'false', value: false, expectedCssClass: `${tagName}_hide-space-right` },
]
