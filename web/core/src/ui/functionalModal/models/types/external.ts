import { omit } from 'radash'
import {
  type IYCoreModalExternalProps,
  createCoreModalExternalProps,
} from '~core/ui/modal/models/types/external'
import type { ILocale } from '~core/i18n'

export interface IYCoreFunctionalModalExternalProps
  extends Omit<IYCoreModalExternalProps, 'variant'> {
  heading: string | undefined
  subHeading: string | undefined
  locale: ILocale | undefined
  hideFooter: boolean | undefined
}

export const createCoreFunctionalModalExternalProps = (): IYCoreFunctionalModalExternalProps => {
  return {
    ...omit(createCoreModalExternalProps(), ['variant']),
    heading: '',
    subHeading: '',
    locale: undefined,
    hideFooter: false,
  }
}
