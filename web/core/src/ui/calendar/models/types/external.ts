import { type ILocale } from '~core/i18n'

export interface IAltCoreCalendarExternalProps {
  date: string | [string, string] | undefined
  isRange: boolean | undefined
  minDate: string | undefined
  maxDate: string | undefined
  disabled: boolean | undefined
  headerSelectors: boolean | undefined
  locale: ILocale | undefined
}

export const createCoreCalendarExternalProps = (): IAltCoreCalendarExternalProps => ({ date: undefined, isRange: false, minDate: undefined, maxDate: undefined, disabled: false, headerSelectors: true, locale: undefined })
