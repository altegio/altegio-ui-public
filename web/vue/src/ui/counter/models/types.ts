import type { TDefinedVueProps } from '~web/vue/src/utils/utility-types'
import {
  createCoreCounterProps,
  type IAltCoreCounterProps,
} from '~core/ui/counter/models/types'

export interface IAltVueCoreCounterProps extends IAltCoreCounterProps {}

export interface IAltVueCounterProps {
  value: IAltVueCoreCounterProps['value']
  variant: IAltVueCoreCounterProps['variant']
  size?: IAltVueCoreCounterProps['size']
  disabled?: IAltVueCoreCounterProps['disabled']
  withPlusSign?: IAltVueCoreCounterProps['withPlusSign']
  max?: IAltVueCoreCounterProps['max']
  accessibleName?: IAltVueCoreCounterProps['accessibleName']
  locator?: IAltVueCoreCounterProps['locator']
}

export const createVueCounterProps = (): TDefinedVueProps<IAltVueCounterProps> => {
  const { size, disabled, withPlusSign, max, accessibleName, locator } = createCoreCounterProps()

  return {
    size,
    disabled,
    withPlusSign,
    max,
    accessibleName,
    locator,
  }
}
