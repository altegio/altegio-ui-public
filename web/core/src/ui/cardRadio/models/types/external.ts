import { pick } from 'radash'
import { createCoreCardWrapperProps, type IYCoreCardWrapperProps } from '~core/ui/cardWrapper/models/types'

export interface IYCoreCardRadioExternalProps
  extends Pick<IYCoreCardWrapperProps, 'disabled' | 'size' | 'checked'> {
}

export const createCoreCardRadioExternalProps = (): IYCoreCardRadioExternalProps => ({ ...pick(createCoreCardWrapperProps(), ['disabled', 'size', 'checked']) })
