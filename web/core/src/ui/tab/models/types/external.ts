import type { TAddPrefixToObject } from '~shared/types/utils'
import { addPrefixToObjectKeys } from '~shared/utils'
import { pick } from 'radash'
import { createCoreTagExternalProps, type IYTagExternalProps } from '~core/ui/tag/models/types'
import { createCoreCounterExternalProps, type IYCoreCounterExternalProps } from '~core/ui/counter/models/types'
import { type IYCoreIconExternalProps } from '~core/ui/icon/models/types'

export interface IYCoreTabExternalProps extends
  TAddPrefixToObject<Pick<IYTagExternalProps, 'variant'>, 'tag'>,
  TAddPrefixToObject<Pick<IYCoreCounterExternalProps, 'value'>, 'counter'> {
  leftIcon: IYCoreIconExternalProps['icon'] | undefined
  leftIconSize: IYCoreIconExternalProps['size']
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

export const createCoreTabExternalProps = (): IYCoreTabExternalProps => {
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
