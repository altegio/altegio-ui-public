import type { TAddPrefixToObject } from '~shared/types/utils'
import { addPrefixToObjectKeys } from '~shared/utils'
import { pick } from 'radash'
import { createCoreTagExternalProps, type IAltTagExternalProps } from '~core/ui/tag/models/types'
import { createCoreCounterExternalProps, type IAltCoreCounterExternalProps } from '~core/ui/counter/models/types'
import { type IAltCoreIconExternalProps } from '~core/ui/icon/models/types'

export interface IAltCoreTabExternalProps extends
  TAddPrefixToObject<Pick<IAltTagExternalProps, 'variant'>, 'tag'>,
  TAddPrefixToObject<Pick<IAltCoreCounterExternalProps, 'value'>, 'counter'> {
  leftIcon: IAltCoreIconExternalProps['icon'] | undefined
  leftIconSize: IAltCoreIconExternalProps['size']
  text: string | undefined
  active: boolean | undefined
  disabled: boolean | undefined
  isTagVisible: boolean | undefined
  tagText: string | undefined
  isCounterVisible: boolean | undefined
  locator: string | undefined
  locatorTag: string | undefined
  locatorCounter: string | undefined
}

export const createCoreTabExternalProps = (): IAltCoreTabExternalProps => {
  return {
    ...addPrefixToObjectKeys(pick(createCoreTagExternalProps(), ['variant']), 'tag'),
    ...addPrefixToObjectKeys(pick(createCoreCounterExternalProps(), ['value']), 'counter'),
    leftIcon: undefined,
    leftIconSize: '16px',
    text: '',
    isTagVisible: false,
    tagText: undefined,
    isCounterVisible: false,
    active: false,
    disabled: false,
    locator: undefined,
    locatorTag: undefined,
    locatorCounter: undefined,
  }
}
