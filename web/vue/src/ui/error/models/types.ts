import {
  createCoreErrorExternalProps,
  type IYCoreErrorExternalProps,
} from '~core/ui/error/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreErrorProps extends IYCoreErrorExternalProps {}

export interface IYVueErrorProps {
  errors?: IYVueCoreErrorProps['errors']
}

export const createVueErrorProps = (): TDefinedVueProps<IYVueErrorProps> => {
  const { errors } = createCoreErrorExternalProps()
  return { errors: errors ? () => errors : undefined }
}
