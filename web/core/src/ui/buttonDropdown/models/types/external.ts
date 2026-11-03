import {
  createCoreDropdownProps,
  type IAltCoreDropdownProps,
} from '~core/ui/dropdown/models/types'
import {
  createCoreButtonProps,
  type IAltCoreButtonProps,
} from '~core/ui/button/models/types'
import {
  createCoreDropdownListProps,
  type IAltCoreDropdownListProps,
} from '~core/ui/dropdownList/models/types'
import { EAltCoreButtonDropdownIconTypes } from './internal'

export interface IAltCoreButtonDropdownProps extends
  Pick<IAltCoreButtonProps, 'disabled' | 'loading' | 'fullWidth' | 'size' | 'variant' | 'label' | 'alignment'>,
  Pick<IAltCoreDropdownProps, 'isOpen'>,
  Pick<IAltCoreDropdownListProps, 'items'> {
  iconType: EAltCoreButtonDropdownIconTypes | undefined
  autoClose: boolean | undefined
}

export const createCoreButtonDropdownProps = (): IAltCoreButtonDropdownProps => {
  const { disabled, loading, fullWidth, size, variant, label, alignment } = createCoreButtonProps()
  const { isOpen } = createCoreDropdownProps()
  const { items } = createCoreDropdownListProps()

  return {
    disabled,
    loading,
    fullWidth,
    isOpen,
    autoClose: false,
    variant,
    size,
    label,
    alignment,
    iconType: EAltCoreButtonDropdownIconTypes.RIGHT,
    items,
  }
}
