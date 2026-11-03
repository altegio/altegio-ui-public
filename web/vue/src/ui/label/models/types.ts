import {
  createCoreLabelProps,
  type IAltCoreLabelProps,
} from '~core/ui/label/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreLabelProps extends IAltCoreLabelProps {}

export interface IAltVueLabelProps {
  text?: IAltVueCoreLabelProps['text']
  tooltipText?: IAltVueCoreLabelProps['tooltipText']
  tooltipActive?: IAltVueCoreLabelProps['tooltipActive']
  disabled?: IAltVueCoreLabelProps['disabled']
  required?: IAltVueCoreLabelProps['required']
  debounce?: IAltVueCoreLabelProps['debounce']
  alignment?: IAltVueCoreLabelProps['alignment']
  wrap?: IAltVueCoreLabelProps['wrap']
  size?: IAltVueCoreLabelProps['size']
  variant?: IAltVueCoreLabelProps['variant']
  tooltipPlacement?: IAltVueCoreLabelProps['tooltipPlacement']
}

export const createVueLabelProps = (): TDefinedVueProps<IAltVueLabelProps> => {
  const { text, tooltipText, disabled, required, debounce, alignment, tooltipPlacement, tooltipActive, wrap, size, variant } = createCoreLabelProps()

  return { text, tooltipText, tooltipActive, disabled, required, debounce, alignment, wrap, size, variant, tooltipPlacement }
}
