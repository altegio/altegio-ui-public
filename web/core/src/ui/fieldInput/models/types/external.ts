import { pick } from 'radash'

import {
  type IYCoreFieldWrapperProps,
  createCoreFieldWrapperProps,
} from '~core/ui/fieldWrapper/models/types'
import type { TYInputAutocomplete } from '~shared/types/global'
import { EYInputAutocomplete, EYInputType, type TYInputType } from '~shared/types/global'

export interface IYCoreFieldInputExternalProps
  extends Pick<IYCoreFieldWrapperProps, 'disabled' | 'size' | 'readonly'> {
  value: string
  name: string | undefined
  type: TYInputType | undefined
  placeholder: string | undefined
  required: boolean | undefined
  maxlength: number | undefined
  autofocus: boolean
  hideSpaceLeft: boolean | undefined
  hideSpaceRight: boolean | undefined
  autocomplete: TYInputAutocomplete | undefined
}

export const createCoreFieldInputExternalProps = (): IYCoreFieldInputExternalProps => {
  return {
    ...pick(createCoreFieldWrapperProps(), ['disabled', 'size', 'readonly']),
    value: '',
    name: undefined,
    type: EYInputType.TEXT,
    placeholder: '',
    required: false,
    maxlength: undefined,
    autofocus: false,
    hideSpaceLeft: false,
    hideSpaceRight: false,
    autocomplete: EYInputAutocomplete.ON,
  }
}
