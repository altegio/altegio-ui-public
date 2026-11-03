import type { TDefinedVueProps } from '~vue/utils/utility-types'
import type { IAltCoreTabExternalProps } from '~core/ui/tab/models/types'
import { createCoreTabExternalProps } from '~core/ui/tab/models/types'

export interface IAltVueCoreTabProps extends IAltCoreTabExternalProps {}

export interface IAltVueTabProps {
  tagVariant?: IAltVueCoreTabProps['tagVariant']
  counterValue?: IAltVueCoreTabProps['counterValue']
  leftIcon?: IAltVueCoreTabProps['leftIcon']
  leftIconSize?: IAltVueCoreTabProps['leftIconSize']
  text?: IAltVueCoreTabProps['text']
  active?: IAltVueCoreTabProps['active']
  disabled?: IAltVueCoreTabProps['disabled']
  isTagVisible?: IAltVueCoreTabProps['isTagVisible']
  tagText?: IAltVueCoreTabProps['tagText']
  isCounterVisible?: IAltVueCoreTabProps['isCounterVisible']
  locator?: IAltVueCoreTabProps['locator']
  locatorTag?: IAltVueCoreTabProps['locatorTag']
  locatorCounter?: IAltVueCoreTabProps['locatorCounter']
}

export const createVueTabProps = (): TDefinedVueProps<IAltVueTabProps> => {
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
