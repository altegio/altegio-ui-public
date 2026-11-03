import {
  createCoreFormExternalProps,
  type IAltCoreFormExternalProps,
} from '~core/ui/form/models/types'

export interface IAltNgFormProps extends IAltCoreFormExternalProps {}

export const createNgFormProps = (): IAltNgFormProps => createCoreFormExternalProps()
