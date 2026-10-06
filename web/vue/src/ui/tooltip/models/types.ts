import { createCoreTooltipProps, type IYCoreTooltipProps } from '~core/ui/tooltip/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreTooltipProps extends IYCoreTooltipProps {}

export interface IYVueTooltipProps {
  text?: IYVueCoreTooltipProps['text']
  disabled?: IYVueCoreTooltipProps['disabled']
  placement?: IYVueCoreTooltipProps['placement']
  type?: IYVueCoreTooltipProps['type']
}

export const createVueTooltipProps = (): TDefinedVueProps<IYVueTooltipProps> => {
  const { text, disabled, placement, type } = createCoreTooltipProps()
  return { text, disabled, placement, type }
}
