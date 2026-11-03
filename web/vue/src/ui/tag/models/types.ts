import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreTagProps,
  type IAltCoreTagProps,
} from '~core/ui/tag/models/types'

export { ClickIconEmitEvent } from '~core/ui/tag/models/types'

export interface IAltVueCoreTagProps extends IAltCoreTagProps {}

export interface IAltVueTagProps {
  size?: IAltVueCoreTagProps['size']
  variant?: IAltVueCoreTagProps['variant']
  disabled?: IAltVueCoreTagProps['disabled']
  iconLeft?: IAltVueCoreTagProps['iconLeft']
  locator?: IAltVueCoreTagProps['locator']
  locatorLabel?: IAltVueCoreTagProps['locatorLabel']
  locatorIcon?: IAltVueCoreTagProps['locatorIcon']
}

export const createVueTagProps = (): TDefinedVueProps<IAltVueTagProps> => {
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
