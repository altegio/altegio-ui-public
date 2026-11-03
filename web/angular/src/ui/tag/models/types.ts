import {
  createCoreTagProps,
  type IAltCoreTagProps,
} from '~core/ui/tag/models/types'

export type { TAltCoreTagVariant as TAltNgTagVariant } from '~core/ui/tag/models/types'

export interface IAltNgTagProps extends IAltCoreTagProps {}

export const createNgTagProps = (): IAltNgTagProps => createCoreTagProps()
