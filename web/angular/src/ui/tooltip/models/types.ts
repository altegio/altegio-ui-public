import { createCoreTooltipProps, type IYCoreTooltipProps } from '~core/ui/tooltip/models/types'

export interface IYNgTooltipProps extends IYCoreTooltipProps {}

export const createNgTooltipProps = (): IYNgTooltipProps => createCoreTooltipProps()
