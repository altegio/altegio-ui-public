import { EYCoreTextSize, EYCoreTextVariant } from '~core/ui/text/models/types/external'

export type TYCoreLabelSize = EYCoreTextSize.A2_REGULAR | EYCoreTextSize.P2_REGULAR

export type TYCoreLabelVariant = EYCoreTextVariant.PRIMARY | EYCoreTextVariant.SECONDARY

export interface IYCoreLabelInternalProps {
  tooltipActive: boolean | undefined
  wrap: boolean | undefined
  size: TYCoreLabelSize | undefined
  variant: TYCoreLabelVariant | undefined
}


export const createCoreLabelInternalProps = (): IYCoreLabelInternalProps => {
  return { tooltipActive: true, wrap: false, size: EYCoreTextSize.P2_REGULAR, variant: EYCoreTextVariant.PRIMARY }
}

export const internalPropsKeys = Object.keys(createCoreLabelInternalProps()) as (keyof IYCoreLabelInternalProps)[]
