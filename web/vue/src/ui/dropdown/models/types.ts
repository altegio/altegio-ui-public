import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreDropdownProps,
  type IAltCoreDropdownProps,
} from '~core/ui/dropdown/models/types'

export interface IAltVueCoreDropdownProps extends IAltCoreDropdownProps {}

export interface IAltVueDropdownProps {
  trigger?: IAltVueCoreDropdownProps['trigger']
  isOpen?: IAltVueCoreDropdownProps['isOpen']
  offset?: IAltVueCoreDropdownProps['offset']
  padding?: IAltVueCoreDropdownProps['padding']
  placement?: IAltVueCoreDropdownProps['placement']
  strategy?: IAltVueCoreDropdownProps['strategy']
  middlewares?: IAltVueCoreDropdownProps['middlewares']
  handlers?: IAltVueCoreDropdownProps['handlers']
  transition?: IAltVueCoreDropdownProps['transition']
  disabled?: IAltVueCoreDropdownProps['disabled']
  inline?: IAltVueCoreDropdownProps['inline']
  strictWidth?: IAltVueCoreDropdownProps['strictWidth']
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const createVueDropdownProps = (): TDefinedVueProps<IAltVueDropdownProps> => {
  const { trigger, isOpen, placement, strategy, padding, offset, middlewares, handlers, transition, disabled, inline, strictWidth } = createCoreDropdownProps()

  return {
    trigger,
    isOpen,
    offset: offset ? () => offset : undefined,
    padding: padding ? () => padding : undefined,
    placement,
    strategy,
    middlewares: middlewares ? () => middlewares : undefined,
    handlers: handlers ? () => handlers : undefined,
    transition,
    disabled: disabled ? () => disabled : undefined,
    inline,
    strictWidth,
  }
}
