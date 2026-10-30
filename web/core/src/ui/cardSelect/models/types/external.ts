import { type IAltCoreCardWrapperProps, createCoreCardWrapperProps } from '~core/ui/cardWrapper/models/types'
import { type IAltCoreCardHeaderProps, createCoreCardHeaderProps } from '~core/ui/cardHeader/models/types'

export interface IAltCoreCardSelectExternalProps
  extends IAltCoreCardWrapperProps,
  IAltCoreCardHeaderProps {
  annotation: string | undefined
}

export const createCoreCardSelectExternalProps = (): IAltCoreCardSelectExternalProps => ({
  ...createCoreCardWrapperProps(),
  ...createCoreCardHeaderProps(),
  annotation: undefined,
})
