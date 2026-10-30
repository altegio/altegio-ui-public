import { EAltCoreTextSize, EAltCoreTextVariant } from '~core/ui/text/models/types/external'

export type TAltCoreLabelSize = EAltCoreTextSize.A2_REGULAR | EAltCoreTextSize.P2_REGULAR

export type TAltCoreLabelVariant = EAltCoreTextVariant.PRIMARY | EAltCoreTextVariant.SECONDARY

export interface IAltCoreLabelInternalProps {
  tooltipActive: boolean | undefined
  wrap: boolean | undefined
  size: TAltCoreLabelSize | undefined
  variant: TAltCoreLabelVariant | undefined
}


export const createCoreLabelInternalProps = (): IAltCoreLabelInternalProps => {
  return { tooltipActive: true, wrap: false, size: EAltCoreTextSize.P2_REGULAR, variant: EAltCoreTextVariant.PRIMARY }
}

export const internalPropsKeys = Object.keys(createCoreLabelInternalProps()) as (keyof IAltCoreLabelInternalProps)[]
