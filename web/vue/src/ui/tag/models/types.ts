import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreTagProps,
  type IYCoreTagProps,
} from '~core/ui/tag/models/types'

export { ClickIconEmitEvent } from '~core/ui/tag/models/types'

export interface IYVueCoreTagProps extends IYCoreTagProps {}

export interface IYVueTagProps {
  size?: IYVueCoreTagProps['size']
  variant?: IYVueCoreTagProps['variant']
  disabled?: IYVueCoreTagProps['disabled']
  iconLeft?: IYVueCoreTagProps['iconLeft']
  locator?: IYVueCoreTagProps['locator']
  locatorLabel?: IYVueCoreTagProps['locatorLabel']
  locatorIcon?: IYVueCoreTagProps['locatorIcon']
}

export const createVueTagProps = (): TDefinedVueProps<IYVueTagProps> => {
  const { size, variant, disabled, iconLeft, locator, locatorLabel, locatorIcon } = createCoreTagProps()
  return {
    size,
    variant,
    disabled,
    iconLeft: iconLeft ? () => iconLeft : undefined,
    locator,
    locatorLabel,
    locatorIcon,
  }
}
