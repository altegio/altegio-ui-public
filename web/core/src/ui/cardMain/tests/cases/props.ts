import { EYSizes } from '~shared/types/global'
import { YCoreCardMainTagName as tagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import type { IYCoreCardMainProps } from '../../models/types'

interface IYCoreCardMainPropsHideSpaceLeftPropTestCase extends TPropTestCase<IYCoreCardMainProps, 'hideSpaceLeft'> {
  expectedCssClass: string
}

interface IYCoreCardMainPropsHideSpaceRightPropTestCase extends TPropTestCase<IYCoreCardMainProps, 'hideSpaceRight'> {
  expectedCssClass: string
}

export const propDisabledCases: TPropTestCase<IYCoreCardMainProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propSizeCases: TPropTestCase<IYCoreCardMainProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL },
  { prop: 'size', case: 'medium', value: EYSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EYSizes.LARGE },
]
export const propHideSpaceLeftCases: IYCoreCardMainPropsHideSpaceLeftPropTestCase[] = [
  { prop: 'hideSpaceLeft', case: 'true', value: true, expectedCssClass: `${tagName}_hide-space-left` },
  { prop: 'hideSpaceLeft', case: 'false', value: false, expectedCssClass: `${tagName}_hide-space-left` },
]
export const propHideSpaceRightCases: IYCoreCardMainPropsHideSpaceRightPropTestCase[] = [
  { prop: 'hideSpaceRight', case: 'true', value: true, expectedCssClass: `${tagName}_hide-space-right` },
  { prop: 'hideSpaceRight', case: 'false', value: false, expectedCssClass: `${tagName}_hide-space-right` },
]
