import {
  createCoreLabelProps,
  type IYCoreLabelProps,
} from '~core/ui/label/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreLabelProps extends IYCoreLabelProps {}

export interface IYVueLabelProps {
  text?: IYVueCoreLabelProps['text']
  tooltipText?: IYVueCoreLabelProps['tooltipText']
  tooltipActive?: IYVueCoreLabelProps['tooltipActive']
  disabled?: IYVueCoreLabelProps['disabled']
  required?: IYVueCoreLabelProps['required']
  debounce?: IYVueCoreLabelProps['debounce']
  alignment?: IYVueCoreLabelProps['alignment']
  wrap?: IYVueCoreLabelProps['wrap']
  size?: IYVueCoreLabelProps['size']
  variant?: IYVueCoreLabelProps['variant']
  tooltipPlacement?: IYVueCoreLabelProps['tooltipPlacement']
}

export const createVueLabelProps = (): TDefinedVueProps<IYVueLabelProps> => {
  const { text, tooltipText, disabled, required, debounce, alignment, tooltipPlacement, tooltipActive, wrap, size, variant } = createCoreLabelProps()

  return { text, tooltipText, tooltipActive, disabled, required, debounce, alignment, wrap, size, variant, tooltipPlacement }
}
