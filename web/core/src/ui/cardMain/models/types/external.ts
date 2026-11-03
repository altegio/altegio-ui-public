import { pick } from 'radash'
import { createCoreCardWrapperProps, type IAltCoreCardWrapperProps } from '~core/ui/cardWrapper/models/types'

export interface IAltCoreCardMainExternalProps
  extends Pick<IAltCoreCardWrapperProps, 'disabled' | 'size'> {
  hideSpaceLeft: boolean | undefined
  hideSpaceRight: boolean | undefined
  hasAnnotation: boolean | undefined
}

export const createCoreCardMainExternalProps = (): IAltCoreCardMainExternalProps => ({
  ...pick(createCoreCardWrapperProps(), ['disabled', 'size']),
  hideSpaceLeft: false,
  hideSpaceRight: false,
  hasAnnotation: false,
})
