import type { TDefinedVueProps } from '~web/vue/src/utils/utility-types'
import {
  createCoreCounterProps,
  type IYCoreCounterProps,
} from '~core/ui/counter/models/types'

export interface IYVueCoreCounterProps extends IYCoreCounterProps {}

export interface IYVueCounterProps {
  value: IYVueCoreCounterProps['value']
  variant: IYVueCoreCounterProps['variant']
  size?: IYVueCoreCounterProps['size']
  disabled?: IYVueCoreCounterProps['disabled']
  withPlusSign?: IYVueCoreCounterProps['withPlusSign']
  locator?: IYVueCoreCounterProps['locator']
}

export const createVueCounterProps = (): TDefinedVueProps<IYVueCounterProps> => {
  const { size, disabled, withPlusSign, locator } = createCoreCounterProps()

  return {
    size,
    disabled,
    withPlusSign,
    locator,
  }
}
