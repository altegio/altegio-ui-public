import {
  createCoreDropdownProps,
  type IYCoreDropdownProps,
} from '~core/ui/dropdown/models/types'
import {
  createCoreButtonProps,
  type IYCoreButtonProps,
} from '~core/ui/button/models/types'
import {
  createCoreDropdownListProps,
  type IYCoreDropdownListProps,
} from '~core/ui/dropdownList/models/types'
import { EYCoreButtonDropdownIconTypes } from './internal'

export interface IYCoreButtonDropdownProps extends
  Pick<IYCoreButtonProps, 'disabled' | 'loading' | 'fullWidth' | 'size' | 'variant' | 'label' | 'alignment'>,
  Pick<IYCoreDropdownProps, 'isOpen'>,
  Pick<IYCoreDropdownListProps, 'items'> {
  iconType: EYCoreButtonDropdownIconTypes | undefined
  autoClose: boolean | undefined
}

export const createCoreButtonDropdownProps = (): IYCoreButtonDropdownProps => {
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
    iconType: EYCoreButtonDropdownIconTypes.RIGHT,
    items,
  }
}
