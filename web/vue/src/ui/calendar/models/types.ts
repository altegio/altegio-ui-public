import {
  createCoreCalendarProps,
  type IAltCoreCalendarProps,
} from '~core/ui/calendar/models/types'
import type { SelectEvent } from '~core/ui/calendar/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreCalendarProps extends Omit<IAltCoreCalendarProps, 'date'> {
  modelValue: IAltCoreCalendarProps['date']
}

export interface IAltVueCalendarProps {
  modelValue: IAltVueCoreCalendarProps['modelValue']
  disabled?: IAltVueCoreCalendarProps['disabled']
  isRange?: IAltVueCoreCalendarProps['isRange']
  minDate?: IAltVueCoreCalendarProps['minDate']
  maxDate?: IAltVueCoreCalendarProps['maxDate']
  headerSelectors?: IAltVueCoreCalendarProps['headerSelectors']
  locale?: IAltVueCoreCalendarProps['locale']
}

export const createVueCalendarProps = (): TDefinedVueProps<IAltVueCalendarProps> => {
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

export interface IAltVueCalendarEmits {
  (event: 'update:modelValue', payload: SelectEvent['detail']['value']): void
}
