import {
  createCoreLinearProgressProps,
  type IAltCoreLinearProgressProps,
} from '~core/ui/linearProgress/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueLinearProgressProps {
  value?: IAltCoreLinearProgressProps['value']
  max?: IAltCoreLinearProgressProps['max']
  indeterminate?: IAltCoreLinearProgressProps['indeterminate']
  size?: IAltCoreLinearProgressProps['size']
  variant?: IAltCoreLinearProgressProps['variant']
  accessibleName?: IAltCoreLinearProgressProps['accessibleName']
  valueText?: IAltCoreLinearProgressProps['valueText']
}

export const createVueLinearProgressProps = (): TDefinedVueProps<IAltVueLinearProgressProps> => {
  const { value, max, indeterminate, size, variant, accessibleName, valueText } = createCoreLinearProgressProps()

  return {
    value,
    max,
    indeterminate,
    size,
    variant,
    accessibleName,
    valueText,
  }
}
