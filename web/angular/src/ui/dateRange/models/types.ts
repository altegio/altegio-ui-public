import { omit } from 'radash'
import {
  createCoreDateRangeExternalProps,
  type IAltCoreDateRangeExternalProps,
  type IAltCoreDateRangeValue,
} from '~core/ui/dateRange/models/types'

export type TAltNgDateRangeValue = IAltCoreDateRangeValue

export interface IAltNgDateRangeProps extends Omit<IAltCoreDateRangeExternalProps, 'from' | 'to'> {
  value: TAltNgDateRangeValue | undefined
}

export const createNgDateRangeProps = (): IAltNgDateRangeProps => ({
  ...omit(createCoreDateRangeExternalProps(), ['from', 'to']),
  value: undefined,
})
