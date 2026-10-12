export { isValueEqualListItem, isValueEqualListItemField } from '~core/ui/selectField/models/types/external'
import { createCoreSelectFieldExternalProps } from '~core/ui/selectField/models/types/external'
import type { IYCoreSelectFieldProps, TYCoreSelectFieldItemValue, IYCoreSelectListItem, TItemValue } from '~core/ui/selectField/models/types/external'

export interface IYCoreMultipleSelectFieldExternalProps extends IYCoreSelectFieldProps {
  value: TYCoreSelectFieldItemValue[] | undefined
}


export const isMultipleValueEqualListItems = (value: TYCoreSelectFieldItemValue, isMapOptions: IYCoreSelectFieldProps['isMapOptions']): value is IYCoreSelectListItem[] => {
  return Boolean(value && !isMapOptions)
}

export const isMultipleValueEqualListItemFields = (value: TYCoreSelectFieldItemValue, isMapOptions: IYCoreSelectFieldProps['isMapOptions']): value is IYCoreSelectListItem[TItemValue][] => {
  return Boolean(value && isMapOptions)
}

export const createCoreMultipleSelectFieldExternalProps = (): IYCoreMultipleSelectFieldExternalProps => {
  return { ...createCoreSelectFieldExternalProps(), value: undefined }
}

