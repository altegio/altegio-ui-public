import {
  createCoreLinearProgressExternalProps,
  type IAltCoreLinearProgressExternalProps,
} from '~core/ui/linearProgress/models/types'

export interface IAltNgLinearProgressProps extends IAltCoreLinearProgressExternalProps {}

export const createNgLinearProgressProps = (): IAltNgLinearProgressProps => createCoreLinearProgressExternalProps()
