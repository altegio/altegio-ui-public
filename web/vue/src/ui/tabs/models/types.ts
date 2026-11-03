import type { TDefinedVueProps } from '~vue/utils/utility-types.ts'
import type { IAltCoreTabsExternalProps } from '~core/ui/tabs/models/types'
import { createCoreTabsExternalProps } from '~core/ui/tabs/models/types'
import type { IAltVueTabProps } from '~vue/ui/tab'

export interface IAltVueCoreTabsProps extends Omit<IAltCoreTabsExternalProps, 'value' | 'tabs'> {
  modelValue: IAltCoreTabsExternalProps['value'] | undefined
  tabs: IAltVueTabProps[] | undefined
}

export interface IAltVueTabsProps {
  tabs?: IAltVueCoreTabsProps['tabs']
  modelValue?: IAltVueCoreTabsProps['modelValue']
  accessibleName?: IAltVueCoreTabsProps['accessibleName']
}

export const createVueTabsProps = (): TDefinedVueProps<IAltVueTabsProps> => {
  const { tabs, accessibleName } = createCoreTabsExternalProps()
  return {
    tabs: tabs ? () => tabs : undefined,
    modelValue: undefined,
    accessibleName,
  }
}

export interface IAltTabsEmits {
  (event: 'update:modelValue', payload: IAltVueCoreTabsProps['modelValue']): void
}
