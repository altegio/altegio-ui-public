export { isValueEqualListItem, isValueEqualListItemField } from '~core/ui/selectField/models/types/external'
import { createCoreSelectFieldExternalProps } from '~core/ui/selectField/models/types/external'
import type { IAltCoreSelectFieldProps, TAltCoreSelectFieldItemValue, IAltCoreSelectListItem, TItemValue } from '~core/ui/selectField/models/types/external'

export interface IAltCoreMultipleSelectFieldExternalProps extends IAltCoreSelectFieldProps {
  value: TAltCoreSelectFieldItemValue[] | undefined
}


export const isMultipleValueEqualListItems = (value: TAltCoreSelectFieldItemValue, isMapOptions: IAltCoreSelectFieldProps['isMapOptions']): value is IAltCoreSelectListItem[] => {
  return Boolean(value && !isMapOptions)
}

export const isMultipleValueEqualListItemFields = (value: TAltCoreSelectFieldItemValue, isMapOptions: IAltCoreSelectFieldProps['isMapOptions']): value is IAltCoreSelectListItem[TItemValue][] => {
  return Boolean(value && isMapOptions)
}

export const createCoreMultipleSelectFieldExternalProps = (): IAltCoreMultipleSelectFieldExternalProps => {
  return { ...createCoreSelectFieldExternalProps(), value: undefined }
}

