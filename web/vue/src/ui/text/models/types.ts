import {
  createCoreTextExternalProps,
  type IAltCoreTextExternalProps,
} from '~core/ui/text/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreTextProps extends IAltCoreTextExternalProps {}

export interface IAltVueTextProps {
  size?: IAltVueCoreTextProps['size']
  variant?: IAltVueCoreTextProps['variant']
  ellipsis?: IAltVueCoreTextProps['ellipsis']
  lineclamp?: IAltVueCoreTextProps['lineclamp']
  locator?: IAltVueCoreTextProps['locator']
}

export const createVueTextProps = (): TDefinedVueProps<IAltVueTextProps> => {
  const { size, variant, ellipsis, lineclamp, locator } = createCoreTextExternalProps()
  return {
    size,
    variant,
    ellipsis,
    lineclamp,
    locator,
  }
}
