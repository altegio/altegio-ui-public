import { omit } from 'radash'
import {
  createCoreFieldWrapperProps,
  type IAltCoreFieldWrapperProps,
} from '~core/ui/fieldWrapper/models/types'
import {
  createCoreFieldInputExternalProps,
  type IAltCoreFieldInputExternalProps,
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
import { addPrefixToObjectKeys, type TAddPrefixToObject } from '~shared/utils'
import {
  createCoreEmptyStateExternalProps,
  type IAltCoreEmptyStateExternalProps,
} from '~core/ui/emptyState/models/types/external'

export type TAltCoreAutocompleteFieldAutocompleteOption = {
  id: string | number
  value?: string
  additionalInfo?: string[]
  [key: string]: unknown
}

export type TAltCoreAutocompleteFieldInfo = {
  value: string
}

export interface IAltCoreAutocompleteFieldExternalProps extends
  Omit<IAltCoreFieldWrapperProps, 'clickable'>,
  Omit<IAltCoreFieldInputExternalProps, 'hideSpaceLeft' | 'hideSpaceRight' | 'disabled' | 'size' | 'readonly' | 'maxlength' | 'type' | 'autocomplete'>,
  TAddPrefixToObject<Omit<IAltCoreLabelExternalProps, 'alignment' | 'disabled' | 'required' | 'tooltipPlacement'>, 'label'>,
  TAddPrefixToObject<Omit<IAltCoreAnnotationExternalProps, 'disabled'>, 'annotation'>,
  IAltCoreErrorExternalProps {
  minSearchLength: number | undefined
  disabledAutocomplete: boolean | undefined
  searchFunction: ((query: TAltCoreAutocompleteFieldInfo) => Promise<TAltCoreAutocompleteFieldAutocompleteOption[]> | TAltCoreAutocompleteFieldAutocompleteOption[]) | undefined
  emptyStateTitle: IAltCoreEmptyStateExternalProps['title'] | undefined
  emptyStateDescription: IAltCoreEmptyStateExternalProps['description'] | undefined
  emptyStateIcon: IAltCoreEmptyStateExternalProps['icon'] | undefined

  /** Accessible name of a field without a visible label; the label text names the field otherwise */
  accessibleName: string | undefined
}

export const createCoreAutocompleteFieldExternalProps = (): IAltCoreAutocompleteFieldExternalProps => {
  return {
    ...omit(createCoreFieldWrapperProps(), ['clickable']),
    ...omit(createCoreFieldInputExternalProps(), ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly']),
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
    accessibleName: undefined,
  }
}
