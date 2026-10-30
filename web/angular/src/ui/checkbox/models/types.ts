import { omit } from 'radash'
import {
  createCoreCheckboxExternalProps,
  type IAltCoreCheckboxExternalProps,
} from '~core/ui/checkbox/models/types'

export { CheckboxCheckedEvent } from '~core/ui/checkbox/models/types'

export type TAltNgCheckboxModel = IAltCoreCheckboxExternalProps['checked']
export interface IAltNgCheckboxProps extends Omit<IAltCoreCheckboxExternalProps, 'checked'> {}

export const createNgCheckboxProps = (): IAltNgCheckboxProps => {
  return { ...omit(createCoreCheckboxExternalProps(), ['checked']) }
}
