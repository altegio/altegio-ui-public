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
import { addPrefixToObjectKeys, type TAddPrefixToObject } from '~shared/utils'
import type { MaskitoOptions } from '@maskito/core'

export type { IAltIcon } from '~shared/icons'

export interface IAltCoreTextFieldExternalProps extends
  Omit<IAltCoreFieldWrapperProps, 'clickable'>,
  Omit<IAltCoreFieldInputProps, 'hideSpaceLeft' | 'hideSpaceRight' | 'disabled' | 'size' | 'readonly' | 'autocomplete'>,
  TAddPrefixToObject<Omit<IAltCoreLabelExternalProps, 'alignment' | 'disabled' | 'required' | 'tooltipPlacement'>, 'label'>,
  TAddPrefixToObject<Omit<IAltCoreAnnotationExternalProps, 'disabled'>, 'annotation'>,
  IAltCoreErrorExternalProps {
  clearable: boolean | undefined
  maskOptions: MaskitoOptions | undefined
  locator?: string
  locatorLabel?: string
  locatorError?: string
  locatorClearIcon?: string
}

export const createCoreTextFieldExternalProps = (): IAltCoreTextFieldExternalProps => {
  return {
    ...omit(createCoreFieldWrapperProps(), ['clickable']),
    ...omit(createCoreFieldInputProps(), ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly']),
    ...addPrefixToObjectKeys(omit(createCoreLabelExternalProps(), ['alignment', 'disabled', 'required', 'tooltipPlacement']), 'label'),
    ...addPrefixToObjectKeys(omit(createCoreAnnotationExternalProps(), ['disabled']), 'annotation'),
    ...createCoreErrorExternalProps(),
    clearable: false,
    maskOptions: undefined,
    locator: undefined,
    locatorLabel: undefined,
    locatorError: undefined,
    locatorClearIcon: undefined,
  }
}

/**
 * Props interface for the SearchField wrappers
 */
export interface IAltCoreSearchFieldExternalProps extends Omit<IAltCoreTextFieldExternalProps,
  'clearable' | 'maskOptions' | 'value' | 'readonly' | 'required' | 'maxlength' | 'type'> {
}

export const createCoreSearchFieldExternalProps = (): IAltCoreSearchFieldExternalProps => {
  return {
    ...omit(
      createCoreTextFieldExternalProps(),
      ['value', 'clearable', 'maskOptions', 'readonly', 'required', 'maxlength', 'type'],
    ),
  }
}
