import {
  createCoreBrandButtonProps,
  type IYCoreBrandButtonProps,
  type ClickEvent,
} from '~core/ui/brandButton/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueBrandButtonProps {
  text?: IYCoreBrandButtonProps['text']
  variant?: IYCoreBrandButtonProps['variant']
  size?: IYCoreBrandButtonProps['size']
  disabled?: IYCoreBrandButtonProps['disabled']
  loading?: IYCoreBrandButtonProps['loading']
}

export type TYVueBrandButtonClickEvent = ClickEvent

export interface IYVueBrandButtonEmits {
  (event: 'click', payload: ClickEvent): void
}

export const createVueBrandButtonProps = (): TDefinedVueProps<IYVueBrandButtonProps> => {
  const { variant, size, disabled, loading, text } = createCoreBrandButtonProps()
  return {
    variant,
    size,
    disabled,
    loading,
    text,
  }
}
