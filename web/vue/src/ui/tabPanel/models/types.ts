import {
  createCoreTabPanelProps,
  type IAltCoreTabPanelProps,
} from '~core/ui/tabPanel/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueTabPanelProps {
  name: NonNullable<IAltCoreTabPanelProps['name']>
  label?: IAltCoreTabPanelProps['label']
  labelledby?: IAltCoreTabPanelProps['labelledby']
}

export const createVueTabPanelProps = (): TDefinedVueProps<Omit<IAltVueTabPanelProps, 'name'>> => {
  const { label, labelledby } = createCoreTabPanelProps()

  return {
    label,
    labelledby,
  }
}
