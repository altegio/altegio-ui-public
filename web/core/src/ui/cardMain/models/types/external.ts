import { pick } from 'radash'
import { createCoreCardWrapperProps, type IYCoreCardWrapperProps } from '~core/ui/cardWrapper/models/types'

export interface IYCoreCardMainExternalProps
  extends Pick<IYCoreCardWrapperProps, 'disabled' | 'size'> {
  hideSpaceLeft: boolean | undefined
  hideSpaceRight: boolean | undefined
  hasAnnotation: boolean | undefined
}

export const createCoreCardMainExternalProps = (): IYCoreCardMainExternalProps => ({
  ...pick(createCoreCardWrapperProps(), ['disabled', 'size']),
  hideSpaceLeft: false,
  hideSpaceRight: false,
  hasAnnotation: false,
})
