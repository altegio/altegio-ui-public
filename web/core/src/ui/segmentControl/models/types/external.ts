import type { IYIcon } from '~shared/icons'
import { EYSizes } from '~shared/types/global'

import type { TYCoreSegmentOptionSize } from '~core/ui/segmentOption/models/types'

export interface IYCoreSegmentControlOption {
  active: boolean
  text: string
  value: string
  disabled?: boolean
  icon?: IYIcon
}

export interface IYCoreSegmentControlExternalProps {
  options: IYCoreSegmentControlOption[] | undefined
  size: TYCoreSegmentOptionSize | undefined
  value: IYCoreSegmentControlOption['value'] | undefined
  manual: boolean | undefined
}

export const createCoreSegmentControlExternalProps = (): IYCoreSegmentControlExternalProps => ({
  options: [],
  size: EYSizes.SMALL,
  value: undefined,
  manual: false,
})
