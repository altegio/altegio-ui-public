import type { TDefinedVueProps } from '~vue/utils/utility-types.ts'
import type { IYCoreTabsExternalProps } from '~core/ui/tabs/models/types'
import { createCoreTabsExternalProps } from '~core/ui/tabs/models/types'
import type { IYVueTabProps } from '~vue/ui/tab'

export interface IYVueCoreTabsProps extends Omit<IYCoreTabsExternalProps, 'value' | 'tabs'> {
  modelValue: IYCoreTabsExternalProps['value'] | undefined
  tabs: IYVueTabProps[] | undefined
}

export interface IYVueTabsProps {
  tabs?: IYVueCoreTabsProps['tabs']
  modelValue?: IYVueCoreTabsProps['modelValue']
}

export const createVueTabsProps = (): TDefinedVueProps<IYVueTabsProps> => {
  const { tabs } = createCoreTabsExternalProps()
  return {
    tabs: tabs ? () => tabs : undefined,
    modelValue: undefined,
  }
}

export interface IYTabsEmits {
  (event: 'update:modelValue', payload: IYVueCoreTabsProps['modelValue']): void
}
