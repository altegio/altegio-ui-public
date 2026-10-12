import { createCoreButtonGroupExternalProps } from '~core/ui/buttonGroup/models/types'
import type { IYCoreButtonGroupExternalProps } from '~core/ui/buttonGroup/models/types'

export interface IYVueButtonGroupProps {
  size?: IYCoreButtonGroupExternalProps['size']
  variant?: IYCoreButtonGroupExternalProps['variant']
}


export const createVueButtonGroupProps = (): IYVueButtonGroupProps => {
  const { size, variant } = createCoreButtonGroupExternalProps()
  return {
    size,
    variant,
  }
}
