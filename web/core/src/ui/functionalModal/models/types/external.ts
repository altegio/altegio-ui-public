import { omit } from 'radash'
import {
  type IAltCoreModalExternalProps,
  createCoreModalExternalProps,
} from '~core/ui/modal/models/types/external'
import type { ILocale } from '~core/i18n'

export interface IAltCoreFunctionalModalExternalProps
  extends Omit<IAltCoreModalExternalProps, 'variant'> {
  heading: string | undefined
  subHeading: string | undefined
  locale: ILocale | undefined
  hideFooter: boolean | undefined
}

export const createCoreFunctionalModalExternalProps = (): IAltCoreFunctionalModalExternalProps => {
  return {
    ...omit(createCoreModalExternalProps(), ['variant']),
    heading: '',
    subHeading: '',
    locale: undefined,
    hideFooter: false,
  }
}
