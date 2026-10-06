
import { EYSizes, type TYSizes } from '~shared/types/global'
import type { IYIcon } from '~shared/icons'

export type TYCoreSegmentOptionSize = Extract<
  TYSizes, 'small' | 'medium' | 'large'
>

export interface IYCoreSegmentOptionExternalProps {
  active: boolean | undefined
  disabled: boolean | undefined
  icon: IYIcon | undefined
  locator: string | undefined
  size: TYCoreSegmentOptionSize | undefined
  value: string
}

export const createCoreSegmentOptionExternalProps = (): IYCoreSegmentOptionExternalProps => {
  return {
    active: false,
    disabled: false,
    icon: undefined,
    locator: undefined,
    size: EYSizes.SMALL,
    value: '',
  }
}
