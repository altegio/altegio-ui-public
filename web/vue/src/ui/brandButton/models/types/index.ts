import {
  createCoreBrandButtonProps,
  type IAltCoreBrandButtonProps,
  type ClickEvent,
} from '~core/ui/brandButton/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueBrandButtonProps {
  text?: IAltCoreBrandButtonProps['text']
  variant?: IAltCoreBrandButtonProps['variant']
  size?: IAltCoreBrandButtonProps['size']
  disabled?: IAltCoreBrandButtonProps['disabled']
  loading?: IAltCoreBrandButtonProps['loading']
}

export type TAltVueBrandButtonClickEvent = ClickEvent

export interface IAltVueBrandButtonEmits {
  (event: 'click', payload: ClickEvent): void
}

export const createVueBrandButtonProps = (): TDefinedVueProps<IAltVueBrandButtonProps> => {
  const { variant, size, disabled, loading, text } = createCoreBrandButtonProps()
  return {
    variant,
    size,
    disabled,
    loading,
    text,
  }
}
