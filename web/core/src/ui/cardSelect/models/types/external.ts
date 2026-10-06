import { type IYCoreCardWrapperProps, createCoreCardWrapperProps } from '~core/ui/cardWrapper/models/types'
import { type IYCoreCardHeaderProps, createCoreCardHeaderProps } from '~core/ui/cardHeader/models/types'

export interface IYCoreCardSelectExternalProps
  extends IYCoreCardWrapperProps,
  IYCoreCardHeaderProps {
  annotation: string | undefined
}

export const createCoreCardSelectExternalProps = (): IYCoreCardSelectExternalProps => ({
  ...createCoreCardWrapperProps(),
  ...createCoreCardHeaderProps(),
  annotation: undefined,
})
