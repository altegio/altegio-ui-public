import { createCoreButtonDropdownProps } from '~core/ui/buttonDropdown/models/types'
import type { ItemClickEvent, VisibleEvent, IYCoreButtonDropdownProps } from '~core/ui/buttonDropdown/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreButtonDropdownProps extends Omit<IYCoreButtonDropdownProps, 'isOpen'> {
  modelValue?: IYCoreButtonDropdownProps['isOpen']
}

export interface IYVueButtonDropdownProps {
  modelValue?: IYVueCoreButtonDropdownProps['modelValue']
  disabled?: IYVueCoreButtonDropdownProps['disabled']
  loading?: IYVueCoreButtonDropdownProps['loading']
  size?: IYVueCoreButtonDropdownProps['size']
  variant?: IYVueCoreButtonDropdownProps['variant']
  fullWidth?: IYVueCoreButtonDropdownProps['fullWidth']
  autoClose?: IYVueCoreButtonDropdownProps['autoClose']
  label?: IYVueCoreButtonDropdownProps['label']
  alignment?: IYVueCoreButtonDropdownProps['alignment']
  items?: IYVueCoreButtonDropdownProps['items']
  iconType?: IYVueCoreButtonDropdownProps['iconType']
}

export const createVueButtonDropdownProps = (): TDefinedVueProps<IYVueButtonDropdownProps> => {
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

export interface IYVueButtonDropdownEmits {
  (e: 'item-click', event: ItemClickEvent['detail']['item']): void
  (e: 'update:modelValue', payload: VisibleEvent['detail']['value']): void
}
