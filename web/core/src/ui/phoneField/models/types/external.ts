import { omit } from 'radash'
import {
  createCoreFieldWrapperProps,
  type IAltCoreFieldWrapperProps,
} from '~core/ui/fieldWrapper/models/types'
import {
  createCoreFieldInputProps,
  type IAltCoreFieldInputProps,
} from '~core/ui/fieldInput/models/types'
import {
  createCoreLabelExternalProps,
  type IAltCoreLabelExternalProps,
} from '~core/ui/label/models/types'
import {
  type IAltCoreAnnotationExternalProps,
  createCoreAnnotationExternalProps,
} from '~core/ui/annotation/models/types'
import {
  type IAltCoreErrorExternalProps,
  createCoreErrorExternalProps,
} from '~core/ui/error/models/types'
import type { TAltCountry, TAltCountryMappedById } from '~shared/types/country'
import { addPrefixToObjectKeys, type TAddPrefixToObject } from '~shared/utils'
import {
  createCoreEmptyStateExternalProps,
  type IAltCoreEmptyStateExternalProps,
} from '~core/ui/emptyState/models/types/external'

export type TAltCorePhoneFieldAutocompleteOption = {
  id: string | number
  title?: string
  phone?: string
  additionalPhone?: string
  email?: string
  [key: string]: unknown
}

export type TAltCorePhoneFieldInfoWithMeta = {
  phone: string
  meta: {
    country: TAltCountry | null
    phoneBody: string
  }
}

export interface IAltCorePhoneFieldExternalProps extends
  Omit<IAltCoreFieldWrapperProps, 'clickable'>,
  Omit<IAltCoreFieldInputProps, 'hideSpaceLeft' | 'hideSpaceRight' | 'disabled' | 'size' | 'readonly' | 'maxlength' | 'type' | 'autocomplete'>,
  TAddPrefixToObject<Omit<IAltCoreLabelExternalProps, 'alignment' | 'disabled' | 'required' | 'tooltipPlacement'>, 'label'>,
  TAddPrefixToObject<Omit<IAltCoreAnnotationExternalProps, 'disabled'>, 'annotation'>,
  IAltCoreErrorExternalProps {
  minSearchLength: number | undefined
  withoutCodeSelection: boolean | undefined
  disabledAutocomplete: boolean | undefined
  searchFunction: ((detail: TAltCorePhoneFieldInfoWithMeta) => Promise<TAltCorePhoneFieldAutocompleteOption[]> | TAltCorePhoneFieldAutocompleteOption[]) | undefined
  countries: TAltCountryMappedById | undefined
  defaultCountryId: number | undefined
  optionPhonePrivacyEnabled: boolean | undefined
  emptyStateTitle: IAltCoreEmptyStateExternalProps['title'] | undefined
  emptyStateDescription: IAltCoreEmptyStateExternalProps['description'] | undefined
  emptyStateIcon: IAltCoreEmptyStateExternalProps['icon'] | undefined
}

export const createCorePhoneFieldExternalProps = (): IAltCorePhoneFieldExternalProps => {
  return {
    ...omit(createCoreFieldWrapperProps(), ['clickable']),
    ...omit(createCoreFieldInputProps(), ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly']),
    ...addPrefixToObjectKeys(omit(createCoreLabelExternalProps(), ['alignment', 'disabled', 'required', 'tooltipPlacement']), 'label'),
    ...addPrefixToObjectKeys(omit(createCoreAnnotationExternalProps(), ['disabled']), 'annotation'),
    ...createCoreErrorExternalProps(),
    ...addPrefixToObjectKeys(omit(createCoreEmptyStateExternalProps(), ['size']), 'emptyState'),
    minSearchLength: 3,
    withoutCodeSelection: false,
    searchFunction: undefined,
    disabledAutocomplete: undefined,
    countries: undefined,
    defaultCountryId: undefined,
    name: 'field_phone',
    optionPhonePrivacyEnabled: undefined,
    emptyStateTitle: undefined,
    emptyStateDescription: undefined,
    emptyStateIcon: undefined,
  }
}
