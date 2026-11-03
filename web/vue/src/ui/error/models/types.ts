import {
  createCoreErrorExternalProps,
  type IAltCoreErrorExternalProps,
} from '~core/ui/error/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreErrorProps extends IAltCoreErrorExternalProps {}

export interface IAltVueErrorProps {
  errors?: IAltVueCoreErrorProps['errors']
}

export const createVueErrorProps = (): TDefinedVueProps<IAltVueErrorProps> => {
  const { errors } = createCoreErrorExternalProps()
  return { errors: errors ? () => errors : undefined }
}
