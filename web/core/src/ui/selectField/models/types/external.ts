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
import { createCoreDropdownListExternalProps } from '~core/ui/dropdownList/models/types/external'
import type { IDropdownListItem } from '~shared/types/global'
import type { IAltCoreDropdownListProps } from '~core/ui/dropdownList/models/types'
import type { IAltIcon } from '~shared/icons'

export interface IAltCoreSelectListItem extends IDropdownListItem {
  img?: string
  icon?: IAltIcon
  initials?: string
}

export type TItemValue = keyof IAltCoreSelectListItem

export type TAltCoreSelectFieldItemValue = NonNullable<IAltCoreSelectListItem[TItemValue]> | IAltCoreSelectListItem | undefined

export interface IAltCoreSelectFieldProps extends
  Omit<IAltCoreFieldWrapperProps, 'clickable'>,
  Omit<IAltCoreFieldInputProps, 'hideSpaceLeft' | 'hideSpaceRight' | 'disabled' | 'size' | 'readonly' | 'maxlength' | 'type' | 'value' | 'autocomplete'>,
  TAddPrefixToObject<Omit<IAltCoreLabelExternalProps, 'alignment' | 'disabled' | 'required'>, 'label'>,
  TAddPrefixToObject<Omit<IAltCoreAnnotationExternalProps, 'disabled'>, 'annotation'>,
  IAltCoreErrorExternalProps,
  Omit<IAltCoreDropdownListProps, 'selectedItems' | 'minWidth' | 'noMaxHeight'> {
  itemValue: TItemValue | undefined
  isCustomFilter: boolean | undefined
  isFilterable: boolean | undefined
  isMapOptions: boolean
  filterValue: string
  filterCallback?: (items: IAltCoreSelectListItem[], filterValue: string) => IAltCoreSelectListItem[]
}

export interface IAltCoreSelectFieldExternalProps extends IAltCoreSelectFieldProps {
  value?: TAltCoreSelectFieldItemValue
}

export const isValueEqualListItem = (value: TAltCoreSelectFieldItemValue, isMapOptions: IAltCoreSelectFieldProps['isMapOptions']): value is IAltCoreSelectListItem => {
  return Boolean(value && !isMapOptions)
}

export const isValueEqualListItemField = (value: TAltCoreSelectFieldItemValue, isMapOptions: IAltCoreSelectFieldProps['isMapOptions']): value is NonNullable<IAltCoreSelectListItem[TItemValue]> => {
  return Boolean(value && isMapOptions)
}

export const createCoreSelectFieldExternalProps = (): IAltCoreSelectFieldExternalProps => {
  return {
    ...omit(createCoreFieldWrapperProps(), ['clickable']),
    ...omit(createCoreFieldInputProps(), ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly', 'maxlength', 'type', 'value']),
    ...addPrefixToObjectKeys(omit(createCoreLabelExternalProps(), ['alignment', 'disabled', 'required']), 'label'),
    ...addPrefixToObjectKeys(omit(createCoreAnnotationExternalProps(), ['disabled']), 'annotation'),
    ...createCoreErrorExternalProps(),
    ...omit(createCoreDropdownListExternalProps(), ['minWidth', 'noMaxHeight']),
    itemValue: 'id',
    isMapOptions: false,
    value: undefined,
    filterCallback: undefined,
    isCustomFilter: false,
    isFilterable: false,
    filterValue: '',
  }
}

