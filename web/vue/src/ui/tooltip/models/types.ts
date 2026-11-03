import { createCoreTooltipProps, type IAltCoreTooltipProps } from '~core/ui/tooltip/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreTooltipProps extends IAltCoreTooltipProps {}

export interface IAltVueTooltipProps {
  text?: IAltVueCoreTooltipProps['text']
  disabled?: IAltVueCoreTooltipProps['disabled']
  placement?: IAltVueCoreTooltipProps['placement']
  type?: IAltVueCoreTooltipProps['type']
}

export const createVueTooltipProps = (): TDefinedVueProps<IAltVueTooltipProps> => {
  const { text, disabled, placement, type } = createCoreTooltipProps()
  return { text, disabled, placement, type }
}
