import {
  createCorePopoverProps,
  type IAltCorePopoverProps,
} from '~core/ui/popover/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCorePopoverProps extends IAltCorePopoverProps {}

export interface IAltVuePopoverProps {
  padding?: IAltVueCorePopoverProps['padding']
  offset?: IAltVueCorePopoverProps['offset']
  trigger?: IAltVueCorePopoverProps['trigger']
  isOpen?: IAltVueCorePopoverProps['isOpen']
  placement?: IAltVueCorePopoverProps['placement']
  strategy?: IAltVueCorePopoverProps['strategy']
  transition?: IAltVueCorePopoverProps['transition']
  type?: IAltVueCorePopoverProps['type']
  submitText?: IAltVueCorePopoverProps['submitText']
  cancelText?: IAltVueCorePopoverProps['cancelText']
  disabled?: IAltVueCorePopoverProps['disabled']
  inline?: IAltVueCorePopoverProps['inline']
}

export const createVuePopoverProps = (): TDefinedVueProps<IAltVuePopoverProps> => {
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

export interface IAltVuePopoverEmits {
  (event: 'submit' | 'cancel'): void
}
