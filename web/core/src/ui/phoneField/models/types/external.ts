import { omit } from 'radash'
import {
  createCoreFieldWrapperProps,
  type IYCoreFieldWrapperProps,
} from '~core/ui/fieldWrapper/models/types'
import {
  createCoreFieldInputProps,
  type IYCoreFieldInputProps,
} from '~core/ui/fieldInput/models/types'
import {
  createCoreLabelExternalProps,
  type IYCoreLabelExternalProps,
} from '~core/ui/label/models/types'
import {
  type IYCoreAnnotationExternalProps,
  createCoreAnnotationExternalProps,
} from '~core/ui/annotation/models/types'
import {
  type IYCoreErrorExternalProps,
  createCoreErrorExternalProps,
} from '~core/ui/error/models/types'
import type { TYCountry, TYCountryMappedById } from '~shared/types/country'
import { addPrefixToObjectKeys, type TAddPrefixToObject } from '~shared/utils'
import {
  createCoreEmptyStateExternalProps,
  type IYCoreEmptyStateExternalProps,
} from '~core/ui/emptyState/models/types/external'

export type TYCorePhoneFieldAutocompleteOption = {
  id: string | number
  title?: string
  phone?: string
  additionalPhone?: string
  email?: string
  [key: string]: unknown
}

export type TYCorePhoneFieldInfoWithMeta = {
  phone: string
  meta: {
    country: TYCountry | null
    phoneBody: string
  }
}

export interface IYCorePhoneFieldExternalProps extends
  Omit<IYCoreFieldWrapperProps, 'clickable'>,
  Omit<IYCoreFieldInputProps, 'hideSpaceLeft' | 'hideSpaceRight' | 'disabled' | 'size' | 'readonly' | 'maxlength' | 'type' | 'autocomplete'>,
  TAddPrefixToObject<Omit<IYCoreLabelExternalProps, 'alignment' | 'disabled' | 'required' | 'tooltipPlacement'>, 'label'>,
  TAddPrefixToObject<Omit<IYCoreAnnotationExternalProps, 'disabled'>, 'annotation'>,
  IYCoreErrorExternalProps {
  minSearchLength: number | undefined
  withoutCodeSelection: boolean | undefined
  disabledAutocomplete: boolean | undefined
  searchFunction: ((detail: TYCorePhoneFieldInfoWithMeta) => Promise<TYCorePhoneFieldAutocompleteOption[]> | TYCorePhoneFieldAutocompleteOption[]) | undefined
  countries: TYCountryMappedById | undefined
  defaultCountryId: number | undefined
  optionPhonePrivacyEnabled: boolean | undefined
  emptyStateTitle: IYCoreEmptyStateExternalProps['title'] | undefined
  emptyStateDescription: IYCoreEmptyStateExternalProps['description'] | undefined
  emptyStateIcon: IYCoreEmptyStateExternalProps['icon'] | undefined
}

export const createCorePhoneFieldExternalProps = (): IYCorePhoneFieldExternalProps => {
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
