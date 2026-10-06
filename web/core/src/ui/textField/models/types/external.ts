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
import type { MaskitoOptions } from '@maskito/core'

export type { IYIcon } from '~shared/icons'

export interface IYCoreTextFieldExternalProps extends
  Omit<IYCoreFieldWrapperProps, 'clickable'>,
  Omit<IYCoreFieldInputProps, 'hideSpaceLeft' | 'hideSpaceRight' | 'disabled' | 'size' | 'readonly' | 'autocomplete'>,
  TAddPrefixToObject<Omit<IYCoreLabelExternalProps, 'alignment' | 'disabled' | 'required' | 'tooltipPlacement'>, 'label'>,
  TAddPrefixToObject<Omit<IYCoreAnnotationExternalProps, 'disabled'>, 'annotation'>,
  IYCoreErrorExternalProps {
  clearable: boolean | undefined
  maskOptions: MaskitoOptions | undefined
  locator?: string
  locatorLabel?: string
  locatorError?: string
  locatorClearIcon?: string
}

export const createCoreTextFieldExternalProps = (): IYCoreTextFieldExternalProps => {
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
 * Интерфейс для SearchField оберток
 */
export interface IYCoreSearchFieldExternalProps extends Omit<IYCoreTextFieldExternalProps,
  'clearable' | 'maskOptions' | 'value' | 'readonly' | 'required' | 'maxlength' | 'type'> {
}

export const createCoreSearchFieldExternalProps = (): IYCoreSearchFieldExternalProps => {
  return {
    ...omit(
      createCoreTextFieldExternalProps(),
      ['value', 'clearable', 'maskOptions', 'readonly', 'required', 'maxlength', 'type'],
    ),
  }
}
