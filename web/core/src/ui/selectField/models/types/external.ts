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
import { createCoreDropdownListExternalProps } from '~core/ui/dropdownList/models/types/external'
import type { IDropdownListItem } from '~shared/types/global'
import type { IYCoreDropdownListProps } from '~core/ui/dropdownList/models/types'
import type { IYIcon } from '~shared/icons'

export interface IYCoreSelectListItem extends IDropdownListItem {
  img?: string
  icon?: IYIcon
  initials?: string
}

export type TItemValue = keyof IYCoreSelectListItem

export type TYCoreSelectFieldItemValue = NonNullable<IYCoreSelectListItem[TItemValue]> | IYCoreSelectListItem | undefined

export interface IYCoreSelectFieldProps extends
  Omit<IYCoreFieldWrapperProps, 'clickable'>,
  Omit<IYCoreFieldInputProps, 'hideSpaceLeft' | 'hideSpaceRight' | 'disabled' | 'size' | 'readonly' | 'maxlength' | 'type' | 'value' | 'autocomplete'>,
  TAddPrefixToObject<Omit<IYCoreLabelExternalProps, 'alignment' | 'disabled' | 'required'>, 'label'>,
  TAddPrefixToObject<Omit<IYCoreAnnotationExternalProps, 'disabled'>, 'annotation'>,
  IYCoreErrorExternalProps,
  Omit<IYCoreDropdownListProps, 'selectedItems' | 'minWidth' | 'noMaxHeight'> {
  itemValue: TItemValue | undefined
  isCustomFilter: boolean | undefined
  isFilterable: boolean | undefined
  isMapOptions: boolean
  filterValue: string
  filterCallback?: (items: IYCoreSelectListItem[], filterValue: string) => IYCoreSelectListItem[]
}

export interface IYCoreSelectFieldExternalProps extends IYCoreSelectFieldProps {
  value?: TYCoreSelectFieldItemValue
}

export const isValueEqualListItem = (value: TYCoreSelectFieldItemValue, isMapOptions: IYCoreSelectFieldProps['isMapOptions']): value is IYCoreSelectListItem => {
  return Boolean(value && !isMapOptions)
}

export const isValueEqualListItemField = (value: TYCoreSelectFieldItemValue, isMapOptions: IYCoreSelectFieldProps['isMapOptions']): value is NonNullable<IYCoreSelectListItem[TItemValue]> => {
  return Boolean(value && isMapOptions)
}

export const createCoreSelectFieldExternalProps = (): IYCoreSelectFieldExternalProps => {
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

