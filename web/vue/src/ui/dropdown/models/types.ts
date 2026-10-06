import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreDropdownProps,
  type IYCoreDropdownProps,
} from '~core/ui/dropdown/models/types'

export interface IYVueCoreDropdownProps extends IYCoreDropdownProps {}

export interface IYVueDropdownProps {
  trigger?: IYVueCoreDropdownProps['trigger']
  isOpen?: IYVueCoreDropdownProps['isOpen']
  offset?: IYVueCoreDropdownProps['offset']
  padding?: IYVueCoreDropdownProps['padding']
  placement?: IYVueCoreDropdownProps['placement']
  strategy?: IYVueCoreDropdownProps['strategy']
  middlewares?: IYVueCoreDropdownProps['middlewares']
  handlers?: IYVueCoreDropdownProps['handlers']
  transition?: IYVueCoreDropdownProps['transition']
  disabled?: IYVueCoreDropdownProps['disabled']
  inline?: IYVueCoreDropdownProps['inline']
  strictWidth?: IYVueCoreDropdownProps['strictWidth']
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const createVueDropdownProps = (): TDefinedVueProps<IYVueDropdownProps> => {
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
