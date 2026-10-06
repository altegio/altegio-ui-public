import {
  createCoreTextExternalProps,
  type IYCoreTextExternalProps,
} from '~core/ui/text/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreTextProps extends IYCoreTextExternalProps {}

export interface IYVueTextProps {
  size?: IYVueCoreTextProps['size']
  variant?: IYVueCoreTextProps['variant']
  ellipsis?: IYVueCoreTextProps['ellipsis']
  lineclamp?: IYVueCoreTextProps['lineclamp']
  locator?: IYVueCoreTextProps['locator']
}

export const createVueTextProps = (): TDefinedVueProps<IYVueTextProps> => {
  const { size, variant, ellipsis, lineclamp, locator } = createCoreTextExternalProps()
  return {
    size,
    variant,
    ellipsis,
    lineclamp,
    locator,
  }
}
