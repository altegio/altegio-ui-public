import type { IAltIcon } from '~shared/icons'
import { EAltSizes } from '~shared/types/global'

import type { TAltCoreSegmentOptionSize } from '~core/ui/segmentOption/models/types'

export interface IAltCoreSegmentControlOption {
  active: boolean
  text: string
  value: string
  disabled?: boolean
  icon?: IAltIcon
}

export interface IAltCoreSegmentControlExternalProps {
  options: IAltCoreSegmentControlOption[] | undefined
  size: TAltCoreSegmentOptionSize | undefined
  value: IAltCoreSegmentControlOption['value'] | undefined
  manual: boolean | undefined
}

export const createCoreSegmentControlExternalProps = (): IAltCoreSegmentControlExternalProps => ({
  options: [],
  size: EAltSizes.SMALL,
  value: undefined,
  manual: false,
})
