import {
  createCoreTipProps,
  type IYCoreTipProps,
} from '~core/ui/tip/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreTipProps extends IYCoreTipProps {}

export interface IYVueTipProps {
  padding?: IYVueCoreTipProps['padding']
  offset?: IYVueCoreTipProps['offset']
  trigger?: IYVueCoreTipProps['trigger']
  isOpen?: IYVueCoreTipProps['isOpen']
  placement?: IYVueCoreTipProps['placement']
  strategy?: IYVueCoreTipProps['strategy']
  transition?: IYVueCoreTipProps['transition']
  type?: IYVueCoreTipProps['type']
  inline?: IYVueCoreTipProps['inline']
  disabled?: IYVueCoreTipProps['disabled']
}

export const createVueTipProps = (): TDefinedVueProps<IYVueTipProps> => {
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
