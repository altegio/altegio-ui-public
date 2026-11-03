import { pick } from 'radash'
import type { IAltIcon } from '~shared/icons'
import { createCoreCardWrapperProps, type IAltCoreCardWrapperProps } from '~core/ui/cardWrapper/models/types'
import type { TAltCoreTagVariant } from '~core/ui/tag/models/types'

export interface IAltCoreCardHeaderExternalProps
  extends Pick<IAltCoreCardWrapperProps, 'disabled' | 'size'> {
  headerText: string | undefined
  tagText: string | undefined
  tagVariant: TAltCoreTagVariant | undefined
  headerIcon: IAltIcon | undefined
}

export const createCoreCardHeaderExternalProps = (): IAltCoreCardHeaderExternalProps => ({
  ...pick(createCoreCardWrapperProps(), ['disabled', 'size']),
  headerText: undefined,
  tagText: undefined,
  tagVariant: undefined,
  headerIcon: undefined,
})
