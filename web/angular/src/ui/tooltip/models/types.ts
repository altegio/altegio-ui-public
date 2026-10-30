import { createCoreTooltipProps, type IAltCoreTooltipProps } from '~core/ui/tooltip/models/types'

export interface IAltNgTooltipProps extends IAltCoreTooltipProps {}

export const createNgTooltipProps = (): IAltNgTooltipProps => createCoreTooltipProps()
