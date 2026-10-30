import { createCoreButtonGroupExternalProps } from '~core/ui/buttonGroup/models/types'
import type { IAltCoreButtonGroupExternalProps } from '~core/ui/buttonGroup/models/types'

export interface IAltVueButtonGroupProps {
  size?: IAltCoreButtonGroupExternalProps['size']
  variant?: IAltCoreButtonGroupExternalProps['variant']
}


export const createVueButtonGroupProps = (): IAltVueButtonGroupProps => {
  const { size, variant } = createCoreButtonGroupExternalProps()
  return {
    size,
    variant,
  }
}
