import { pick } from 'radash'

import {
  type IAltCoreFieldWrapperProps,
  createCoreFieldWrapperProps,
} from '~core/ui/fieldWrapper/models/types'
import type { TAltInputAutocomplete } from '~shared/types/global'
import { EAltInputAutocomplete, EAltInputType, type TAltInputType } from '~shared/types/global'

export interface IAltCoreFieldInputExternalProps
  extends Pick<IAltCoreFieldWrapperProps, 'disabled' | 'size' | 'readonly'> {
  value: string
  name: string | undefined
  type: TAltInputType | undefined
  placeholder: string | undefined
  required: boolean | undefined
  maxlength: number | undefined
  autofocus: boolean
  hideSpaceLeft: boolean | undefined
  hideSpaceRight: boolean | undefined
  autocomplete: TAltInputAutocomplete | undefined
}

export const createCoreFieldInputExternalProps = (): IAltCoreFieldInputExternalProps => {
  return {
    ...pick(createCoreFieldWrapperProps(), ['disabled', 'size', 'readonly']),
    value: '',
    name: undefined,
    type: EAltInputType.TEXT,
    placeholder: '',
    required: false,
    maxlength: undefined,
    autofocus: false,
    hideSpaceLeft: false,
    hideSpaceRight: false,
    autocomplete: EAltInputAutocomplete.ON,
  }
}
