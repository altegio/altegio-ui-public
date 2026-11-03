import {
  createCoreListItemProps,
  type IAltCoreListItemProps,
} from '~core/ui/listItem/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueListItemProps {
  label?: IAltCoreListItemProps['label']
  caption?: IAltCoreListItemProps['caption']
  clickable?: IAltCoreListItemProps['clickable']
  href?: IAltCoreListItemProps['href']
  target?: IAltCoreListItemProps['target']
  disabled?: IAltCoreListItemProps['disabled']
  active?: IAltCoreListItemProps['active']
  align?: IAltCoreListItemProps['align']
}

export const createVueListItemProps = (): TDefinedVueProps<IAltVueListItemProps> => {
  const {
    label,
    caption,
    clickable,
    href,
    target,
    disabled,
    active,
    align,
  } = createCoreListItemProps()

  return {
    label,
    caption,
    clickable,
    href,
    target,
    disabled,
    active,
    align,
  }
}
