import { omit } from 'radash'

import {
  createCoreCountFieldProps,
  type IYCoreCountFieldProps,
} from '~core/ui/countField/models/types'

export type TYNgCountFieldModel = number

export interface IYNgCountFieldProps extends Omit<IYCoreCountFieldProps, 'value'> {}

export const createNgCountFieldProps = (): IYNgCountFieldProps => {
  return { ...omit(createCoreCountFieldProps(), ['value']) }
}
