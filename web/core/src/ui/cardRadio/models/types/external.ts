import { pick } from 'radash'
import { createCoreCardWrapperProps, type IAltCoreCardWrapperProps } from '~core/ui/cardWrapper/models/types'

export interface IAltCoreCardRadioExternalProps
  extends Pick<IAltCoreCardWrapperProps, 'disabled' | 'size' | 'checked'> {
}

export const createCoreCardRadioExternalProps = (): IAltCoreCardRadioExternalProps => ({ ...pick(createCoreCardWrapperProps(), ['disabled', 'size', 'checked']) })
