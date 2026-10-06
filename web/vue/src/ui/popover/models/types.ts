import {
  createCorePopoverProps,
  type IYCorePopoverProps,
} from '~core/ui/popover/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCorePopoverProps extends IYCorePopoverProps {}

export interface IYVuePopoverProps {
  padding?: IYVueCorePopoverProps['padding']
  offset?: IYVueCorePopoverProps['offset']
  trigger?: IYVueCorePopoverProps['trigger']
  isOpen?: IYVueCorePopoverProps['isOpen']
  placement?: IYVueCorePopoverProps['placement']
  strategy?: IYVueCorePopoverProps['strategy']
  transition?: IYVueCorePopoverProps['transition']
  type?: IYVueCorePopoverProps['type']
  submitText?: IYVueCorePopoverProps['submitText']
  cancelText?: IYVueCorePopoverProps['cancelText']
  disabled?: IYVueCorePopoverProps['disabled']
  inline?: IYVueCorePopoverProps['inline']
}

export const createVuePopoverProps = (): TDefinedVueProps<IYVuePopoverProps> => {
  const {
    padding,
    offset,
    trigger,
    isOpen,
    placement,
    strategy,
    transition,
    type,
    submitText,
    cancelText,
    disabled,
    inline,
  } = createCorePopoverProps()

  return {
    padding: padding ? () => padding : undefined,
    offset: offset ? () => offset : undefined,
    trigger,
    isOpen,
    placement,
    strategy,
    transition,
    type,
    submitText,
    cancelText,
    disabled,
    inline,
  }
}

export interface IYVuePopoverEmits {
  (event: 'submit' | 'cancel'): void
}
