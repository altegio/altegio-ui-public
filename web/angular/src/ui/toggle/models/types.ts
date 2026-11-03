import { omit } from 'radash'

import {
  createCoreToggleExternalProps,
  type IAltCoreToggleExternalProps,
  type IAltCoreToggleCheckedEvent,
} from '~core/ui/toggle/models/types'

export { ToggleCheckedEvent } from '~core/ui/toggle/models/types'

export type TAltNgToggleModel = IAltCoreToggleCheckedEvent['checked']

export interface IAltNgToggleProps extends Omit<IAltCoreToggleExternalProps, 'checked'> {}

export const createNgToggleProps = (): IAltNgToggleProps => {
  return { ...omit(createCoreToggleExternalProps(), ['checked']) }
}
