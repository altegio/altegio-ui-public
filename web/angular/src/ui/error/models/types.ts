import { createCoreErrorExternalProps, type IYCoreErrorExternalProps } from '~core/ui/error/models/types'

export interface IYNgErrorProps extends IYCoreErrorExternalProps {}

export const createNgErrorProps = (): IYNgErrorProps => createCoreErrorExternalProps()
