import type { TDefinedVueProps } from '~vue/utils/utility-types'
import type { IYCoreTabExternalProps } from '~core/ui/tab/models/types'
import { createCoreTabExternalProps } from '~core/ui/tab/models/types'

export interface IYVueCoreTabProps extends IYCoreTabExternalProps {}

export interface IYVueTabProps {
  tagVariant?: IYVueCoreTabProps['tagVariant']
  counterValue?: IYVueCoreTabProps['counterValue']
  leftIcon?: IYVueCoreTabProps['leftIcon']
  leftIconSize?: IYVueCoreTabProps['leftIconSize']
  text?: IYVueCoreTabProps['text']
  active?: IYVueCoreTabProps['active']
  disabled?: IYVueCoreTabProps['disabled']
  isTagVisible?: IYVueCoreTabProps['isTagVisible']
  tagText?: IYVueCoreTabProps['tagText']
  isCounterVisible?: IYVueCoreTabProps['isCounterVisible']
  locator?: IYVueCoreTabProps['locator']
  locatorTag?: IYVueCoreTabProps['locatorTag']
  locatorCounter?: IYVueCoreTabProps['locatorCounter']
}

export const createVueTabProps = (): TDefinedVueProps<IYVueTabProps> => {
  const {
    tagVariant,
    counterValue,
    leftIcon,
    leftIconSize,
    text,
    active,
    disabled,
    isTagVisible,
    tagText,
    isCounterVisible,
    locator,
    locatorTag,
    locatorCounter,
  } = createCoreTabExternalProps()
  return {
    tagVariant,
    counterValue,
    leftIcon: leftIcon
      ? () => leftIcon
      : undefined,
    leftIconSize,
    text,
    active,
    disabled,
    isTagVisible,
    tagText,
    isCounterVisible,
    locator,
    locatorTag,
    locatorCounter,
  }
}
