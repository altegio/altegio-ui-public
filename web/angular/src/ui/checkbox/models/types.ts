import { omit } from 'radash'
import {
  createCoreCheckboxExternalProps,
  type IYCoreCheckboxExternalProps,
} from '~core/ui/checkbox/models/types'

export { CheckboxCheckedEvent } from '~core/ui/checkbox/models/types'

export type TYNgCheckboxModel = IYCoreCheckboxExternalProps['checked']
export interface IYNgCheckboxProps extends Omit<IYCoreCheckboxExternalProps, 'checked'> {}

export const createNgCheckboxProps = (): IYNgCheckboxProps => {
  return { ...omit(createCoreCheckboxExternalProps(), ['checked']) }
}
