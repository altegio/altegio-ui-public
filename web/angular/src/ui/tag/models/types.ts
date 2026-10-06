import {
  createCoreTagProps,
  type IYCoreTagProps,
} from '~core/ui/tag/models/types'

export type { TYCoreTagVariant as TYNgTagVariant } from '~core/ui/tag/models/types'

export interface IYNgTagProps extends IYCoreTagProps {}

export const createNgTagProps = (): IYNgTagProps => createCoreTagProps()
