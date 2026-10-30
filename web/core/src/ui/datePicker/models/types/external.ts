import { omit } from 'radash'
import {
  type IAltCoreCalendarExternalProps,
  createCoreCalendarExternalProps,
} from '~core/ui/calendar/models/types'
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


export interface IAltCoreDatePickerExternalProps extends
  Omit<IAltCoreFieldWrapperProps, 'clickable'>,
  Omit<IAltCoreFieldInputProps, 'hideSpaceLeft' | 'hideSpaceRight' | 'disabled' | 'size' | 'readonly' | 'value' | 'maxlength' | 'type' | 'autocomplete'>,
  Omit<IAltCoreCalendarExternalProps, 'disabled' | 'headerSelectors'>,
  TAddPrefixToObject<Omit<IAltCoreLabelExternalProps, 'alignment' | 'disabled' | 'required'>, 'label'>,
  TAddPrefixToObject<Omit<IAltCoreAnnotationExternalProps, 'disabled'>, 'annotation'>,
  IAltCoreErrorExternalProps {
  calendarHeaderSelectors: IAltCoreCalendarExternalProps['headerSelectors']
}

export const createCoreDatePickerExternalProps = (): IAltCoreDatePickerExternalProps => {
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
