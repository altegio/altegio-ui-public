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
import { addPrefixToObjectKeys, type TAddPrefixToObject } from '~shared/utils'
import {
  createCoreEmptyStateExternalProps,
  type IYCoreEmptyStateExternalProps,
} from '~core/ui/emptyState/models/types/external'

export type TYCoreAutocompleteFieldAutocompleteOption = {
  id: string | number
  value?: string
  additionalInfo?: string[]
  [key: string]: unknown
}

export type TYCoreAutocompleteFieldInfo = {
  value: string
}

export interface IYCoreAutocompleteFieldExternalProps extends
  Omit<IYCoreFieldWrapperProps, 'clickable'>,
  Omit<IYCoreFieldInputProps, 'hideSpaceLeft' | 'hideSpaceRight' | 'disabled' | 'size' | 'readonly' | 'maxlength' | 'type' | 'autocomplete'>,
  TAddPrefixToObject<Omit<IYCoreLabelExternalProps, 'alignment' | 'disabled' | 'required' | 'tooltipPlacement'>, 'label'>,
  TAddPrefixToObject<Omit<IYCoreAnnotationExternalProps, 'disabled'>, 'annotation'>,
  IYCoreErrorExternalProps {
  minSearchLength: number | undefined
  disabledAutocomplete: boolean | undefined
  searchFunction: ((query: TYCoreAutocompleteFieldInfo) => Promise<TYCoreAutocompleteFieldAutocompleteOption[]> | TYCoreAutocompleteFieldAutocompleteOption[]) | undefined
  emptyStateTitle: IYCoreEmptyStateExternalProps['title'] | undefined
  emptyStateDescription: IYCoreEmptyStateExternalProps['description'] | undefined
  emptyStateIcon: IYCoreEmptyStateExternalProps['icon'] | undefined
}

export const createCoreAutocompleteFieldExternalProps = (): IYCoreAutocompleteFieldExternalProps => {
  return {
    ...omit(createCoreFieldWrapperProps(), ['clickable']),
    ...omit(createCoreFieldInputProps(), ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly']),
    ...addPrefixToObjectKeys(omit(createCoreLabelExternalProps(), ['alignment', 'disabled', 'required', 'tooltipPlacement']), 'label'),
    ...addPrefixToObjectKeys(omit(createCoreAnnotationExternalProps(), ['disabled']), 'annotation'),
    ...createCoreErrorExternalProps(),
    ...addPrefixToObjectKeys(omit(createCoreEmptyStateExternalProps(), ['size']), 'emptyState'),
    minSearchLength: 3,
    searchFunction: undefined,
    disabledAutocomplete: undefined,
    emptyStateTitle: undefined,
    emptyStateDescription: undefined,
    emptyStateIcon: undefined,
  }
}
