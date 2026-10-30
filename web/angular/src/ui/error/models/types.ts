import { createCoreErrorExternalProps, type IAltCoreErrorExternalProps } from '~core/ui/error/models/types'

export interface IAltNgErrorProps extends IAltCoreErrorExternalProps {}

export const createNgErrorProps = (): IAltNgErrorProps => createCoreErrorExternalProps()
