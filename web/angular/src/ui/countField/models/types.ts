import { omit } from 'radash'

import {
  createCoreCountFieldProps,
  type IAltCoreCountFieldProps,
} from '~core/ui/countField/models/types'

export type TAltNgCountFieldModel = number

export interface IAltNgCountFieldProps extends Omit<IAltCoreCountFieldProps, 'value'> {}

export const createNgCountFieldProps = (): IAltNgCountFieldProps => {
  return { ...omit(createCoreCountFieldProps(), ['value']) }
}
