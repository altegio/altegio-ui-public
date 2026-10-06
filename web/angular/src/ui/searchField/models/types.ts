import { omit } from 'radash'

import type {
  IYCoreSearchFieldExternalProps,
  IYCoreTextFieldExternalProps,
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

export type { IYIcon } from '~core/ui/textField/models/types'

export type TYNgSearchFieldModel = IYCoreTextFieldExternalProps['value']

export interface IYNgSearchFieldProps extends Omit<IYCoreSearchFieldExternalProps, 'name'> {}

export const createNgSearchFieldProps = (): IYNgSearchFieldProps => {
  return { ...omit(createCoreSearchFieldExternalProps(), ['name']) }
}


