import { createCoreButtonDropdownProps } from '~core/ui/buttonDropdown/models/types'
import type { ItemClickEvent, VisibleEvent, IAltCoreButtonDropdownProps } from '~core/ui/buttonDropdown/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreButtonDropdownProps extends Omit<IAltCoreButtonDropdownProps, 'isOpen'> {
  modelValue?: IAltCoreButtonDropdownProps['isOpen']
}

export interface IAltVueButtonDropdownProps {
  modelValue?: IAltVueCoreButtonDropdownProps['modelValue']
  disabled?: IAltVueCoreButtonDropdownProps['disabled']
  loading?: IAltVueCoreButtonDropdownProps['loading']
  size?: IAltVueCoreButtonDropdownProps['size']
  variant?: IAltVueCoreButtonDropdownProps['variant']
  fullWidth?: IAltVueCoreButtonDropdownProps['fullWidth']
  autoClose?: IAltVueCoreButtonDropdownProps['autoClose']
  label?: IAltVueCoreButtonDropdownProps['label']
  alignment?: IAltVueCoreButtonDropdownProps['alignment']
  items?: IAltVueCoreButtonDropdownProps['items']
  iconType?: IAltVueCoreButtonDropdownProps['iconType']
}

export const createVueButtonDropdownProps = (): TDefinedVueProps<IAltVueButtonDropdownProps> => {
  const {
    disabled,
    loading,
    size,
    variant,
    fullWidth,
    autoClose,
    label,
    alignment,
    items,
    iconType,
  } = createCoreButtonDropdownProps()

  return {
    modelValue: false,
    disabled,
    loading,
    size,
    variant,
    fullWidth,
    autoClose,
    label,
    alignment,
    items: items ? () => items : undefined,
    iconType,
  }
}

export interface IAltVueButtonDropdownEmits {
  (e: 'item-click', event: ItemClickEvent['detail']['item']): void
  (e: 'update:modelValue', payload: VisibleEvent['detail']['value']): void
}
