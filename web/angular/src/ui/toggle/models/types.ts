import { omit } from 'radash'

import {
  createCoreToggleExternalProps,
  type IYCoreToggleExternalProps,
  type IYCoreToggleCheckedEvent,
} from '~core/ui/toggle/models/types'

export { ToggleCheckedEvent } from '~core/ui/toggle/models/types'

export type TYNgToggleModel = IYCoreToggleCheckedEvent['checked']

export interface IYNgToggleProps extends Omit<IYCoreToggleExternalProps, 'checked'> {}

export const createNgToggleProps = (): IYNgToggleProps => {
  return { ...omit(createCoreToggleExternalProps(), ['checked']) }
}
