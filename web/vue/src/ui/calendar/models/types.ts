import {
  createCoreCalendarProps,
  type IYCoreCalendarProps,
} from '~core/ui/calendar/models/types'
import type { SelectEvent } from '~core/ui/calendar/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreCalendarProps extends Omit<IYCoreCalendarProps, 'date'> {
  modelValue: IYCoreCalendarProps['date']
}

export interface IYVueCalendarProps {
  modelValue: IYVueCoreCalendarProps['modelValue']
  disabled?: IYVueCoreCalendarProps['disabled']
  isRange?: IYVueCoreCalendarProps['isRange']
  minDate?: IYVueCoreCalendarProps['minDate']
  maxDate?: IYVueCoreCalendarProps['maxDate']
  headerSelectors?: IYVueCoreCalendarProps['headerSelectors']
  locale?: IYVueCoreCalendarProps['locale']
}

export const createVueCalendarProps = (): TDefinedVueProps<IYVueCalendarProps> => {
  const { isRange, minDate, maxDate, disabled, headerSelectors, locale } = createCoreCalendarProps()

  return {
    disabled,
    isRange,
    minDate,
    maxDate,
    headerSelectors,
    locale: locale ? () => locale : undefined,
  }
}

export interface IYVueCalendarEmits {
  (event: 'update:modelValue', payload: SelectEvent['detail']['value']): void
}
