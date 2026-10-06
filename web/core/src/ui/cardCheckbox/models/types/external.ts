import { pick } from 'radash'
import { createCoreCardWrapperProps, type IYCoreCardWrapperProps } from '~core/ui/cardWrapper/models/types'

export interface IYCoreCardCheckboxExternalProps
  extends Pick<IYCoreCardWrapperProps, 'disabled' | 'size' | 'checked'> {
}

export const createCoreCardCheckboxExternalProps = (): IYCoreCardCheckboxExternalProps => ({ ...pick(createCoreCardWrapperProps(), ['disabled', 'size', 'checked']) })
