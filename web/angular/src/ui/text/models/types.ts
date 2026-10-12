import { createCoreTextExternalProps, type IYCoreTextExternalProps } from '~core/ui/text/models/types'

export interface IYNgTextProps extends IYCoreTextExternalProps {}

export const createNgTextProps = (): IYNgTextProps => createCoreTextExternalProps()

