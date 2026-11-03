import {
  createCoreTipProps,
  type IAltCoreTipProps,
} from '~core/ui/tip/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreTipProps extends IAltCoreTipProps {}

export interface IAltVueTipProps {
  padding?: IAltVueCoreTipProps['padding']
  offset?: IAltVueCoreTipProps['offset']
  trigger?: IAltVueCoreTipProps['trigger']
  isOpen?: IAltVueCoreTipProps['isOpen']
  placement?: IAltVueCoreTipProps['placement']
  strategy?: IAltVueCoreTipProps['strategy']
  transition?: IAltVueCoreTipProps['transition']
  type?: IAltVueCoreTipProps['type']
  inline?: IAltVueCoreTipProps['inline']
  disabled?: IAltVueCoreTipProps['disabled']
}

export const createVueTipProps = (): TDefinedVueProps<IAltVueTipProps> => {
  const { padding, offset, trigger, isOpen, placement, strategy, transition, type, inline, disabled } = createCoreTipProps()
  return {
    padding: padding ? () => padding : undefined,
    offset: offset ? () => offset : undefined,
    trigger,
    isOpen,
    placement,
    strategy,
    transition,
    type,
    inline,
    disabled,
  }
}
