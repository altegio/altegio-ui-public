import { omit } from 'radash'

import type {
  IAltCoreSearchFieldExternalProps,
  IAltCoreTextFieldExternalProps,
} from '~core/ui/textField/models/types'
import {
  createCoreSearchFieldExternalProps,
} from '~core/ui/textField/models/types'

export {
  InputEvent,
  FocusEvent,
  BlurEvent,
  ClearEvent,
  SEARCH_FIELD_ICON,
} from '~core/ui/textField/models/types'

export type { IAltIcon } from '~core/ui/textField/models/types'

export type TAltNgSearchFieldModel = IAltCoreTextFieldExternalProps['value']

export interface IAltNgSearchFieldProps extends Omit<IAltCoreSearchFieldExternalProps, 'name'> {}

export const createNgSearchFieldProps = (): IAltNgSearchFieldProps => {
  return { ...omit(createCoreSearchFieldExternalProps(), ['name']) }
}


