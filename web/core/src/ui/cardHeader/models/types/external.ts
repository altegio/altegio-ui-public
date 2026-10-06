import { pick } from 'radash'
import type { IYIcon } from '~shared/icons'
import { createCoreCardWrapperProps, type IYCoreCardWrapperProps } from '~core/ui/cardWrapper/models/types'
import type { TYCoreTagVariant } from '~core/ui/tag/models/types'

export interface IYCoreCardHeaderExternalProps
  extends Pick<IYCoreCardWrapperProps, 'disabled' | 'size'> {
  headerText: string | undefined
  tagText: string | undefined
  tagVariant: TYCoreTagVariant | undefined
  headerIcon: IYIcon | undefined
}

export const createCoreCardHeaderExternalProps = (): IYCoreCardHeaderExternalProps => ({
  ...pick(createCoreCardWrapperProps(), ['disabled', 'size']),
  headerText: undefined,
  tagText: undefined,
  tagVariant: undefined,
  headerIcon: undefined,
})
