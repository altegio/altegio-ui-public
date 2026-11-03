import type { ComputedRef, InjectionKey } from 'vue'
import {
  createCoreTabPanelsProps,
  type IAltCoreTabPanelsProps,
} from '~core/ui/tabPanels/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueTabPanelsProps {
  modelValue?: IAltCoreTabPanelsProps['value']
  keepAlive?: boolean
}

export interface IAltVueTabPanelsContext {
  value: ComputedRef<IAltCoreTabPanelsProps['value']>
  keepAlive: ComputedRef<boolean>
}

export const tabPanelsInjectionKey: InjectionKey<IAltVueTabPanelsContext> = Symbol('AltTabPanels')

export const createVueTabPanelsProps = (): TDefinedVueProps<IAltVueTabPanelsProps> => {
  const { value } = createCoreTabPanelsProps()

  return {
    modelValue: value,
    keepAlive: false,
  }
}
