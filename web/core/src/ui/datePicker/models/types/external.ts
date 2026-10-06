import { omit } from 'radash'
import {
  type IYCoreCalendarExternalProps,
  createCoreCalendarExternalProps,
} from '~core/ui/calendar/models/types'
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


export interface IYCoreDatePickerExternalProps extends
  Omit<IYCoreFieldWrapperProps, 'clickable'>,
  Omit<IYCoreFieldInputProps, 'hideSpaceLeft' | 'hideSpaceRight' | 'disabled' | 'size' | 'readonly' | 'value' | 'maxlength' | 'type' | 'autocomplete'>,
  Omit<IYCoreCalendarExternalProps, 'disabled' | 'headerSelectors'>,
  TAddPrefixToObject<Omit<IYCoreLabelExternalProps, 'alignment' | 'disabled' | 'required'>, 'label'>,
  TAddPrefixToObject<Omit<IYCoreAnnotationExternalProps, 'disabled'>, 'annotation'>,
  IYCoreErrorExternalProps {
  calendarHeaderSelectors: IYCoreCalendarExternalProps['headerSelectors']
}

export const createCoreDatePickerExternalProps = (): IYCoreDatePickerExternalProps => {
  const calendarProps = createCoreCalendarExternalProps()
  return {
    ...omit(createCoreFieldWrapperProps(), ['clickable']),
    ...omit(createCoreFieldInputProps(), ['hideSpaceLeft', 'hideSpaceRight', 'disabled', 'size', 'readonly']),
    ...omit(calendarProps, ['disabled', 'headerSelectors']),
    ...addPrefixToObjectKeys(omit(createCoreLabelExternalProps(), ['alignment', 'disabled', 'required']), 'label'),
    ...addPrefixToObjectKeys(omit(createCoreAnnotationExternalProps(), ['disabled']), 'annotation'),
    ...createCoreErrorExternalProps(),
    calendarHeaderSelectors: calendarProps.headerSelectors,
  }
}
