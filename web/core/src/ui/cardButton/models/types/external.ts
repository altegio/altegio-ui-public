import { omit } from 'radash'
import { type IYCoreCardWrapperProps, createCoreCardWrapperProps } from '~core/ui/cardWrapper/models/types'
import { type IYCoreCardHeaderProps, createCoreCardHeaderProps } from '~core/ui/cardHeader/models/types'

export interface IYCoreCardButtonExternalProps
  extends Omit<IYCoreCardWrapperProps, 'checked'>,
  IYCoreCardHeaderProps {
  annotation: string | undefined
}

export const createCoreCardButtonExternalProps = (): IYCoreCardButtonExternalProps => ({
  ...omit(createCoreCardWrapperProps(), ['checked']),
  ...createCoreCardHeaderProps(),
  annotation: undefined,
})
