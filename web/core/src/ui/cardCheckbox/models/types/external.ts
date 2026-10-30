import { pick } from 'radash'
import { createCoreCardWrapperProps, type IAltCoreCardWrapperProps } from '~core/ui/cardWrapper/models/types'

export interface IAltCoreCardCheckboxExternalProps
  extends Pick<IAltCoreCardWrapperProps, 'disabled' | 'size' | 'checked'> {
}

export const createCoreCardCheckboxExternalProps = (): IAltCoreCardCheckboxExternalProps => ({ ...pick(createCoreCardWrapperProps(), ['disabled', 'size', 'checked']) })
