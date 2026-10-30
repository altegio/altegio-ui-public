
import { EAltSizes, type TAltSizes } from '~shared/types/global'
import type { IAltIcon } from '~shared/icons'

export type TAltCoreSegmentOptionSize = Extract<
  TAltSizes, 'small' | 'medium' | 'large'
>

export interface IAltCoreSegmentOptionExternalProps {
  active: boolean | undefined
  disabled: boolean | undefined
  icon: IAltIcon | undefined
  locator: string | undefined
  size: TAltCoreSegmentOptionSize | undefined
  value: string
}

export const createCoreSegmentOptionExternalProps = (): IAltCoreSegmentOptionExternalProps => {
  return {
    active: false,
    disabled: false,
    icon: undefined,
    locator: undefined,
    size: EAltSizes.SMALL,
    value: '',
  }
}
