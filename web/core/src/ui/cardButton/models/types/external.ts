import { omit } from 'radash'
import { type IAltCoreCardWrapperProps, createCoreCardWrapperProps } from '~core/ui/cardWrapper/models/types'
import { type IAltCoreCardHeaderProps, createCoreCardHeaderProps } from '~core/ui/cardHeader/models/types'

export interface IAltCoreCardButtonExternalProps
  extends Omit<IAltCoreCardWrapperProps, 'checked'>,
  IAltCoreCardHeaderProps {
  annotation: string | undefined
}

export const createCoreCardButtonExternalProps = (): IAltCoreCardButtonExternalProps => ({
  ...omit(createCoreCardWrapperProps(), ['checked']),
  ...createCoreCardHeaderProps(),
  annotation: undefined,
})
