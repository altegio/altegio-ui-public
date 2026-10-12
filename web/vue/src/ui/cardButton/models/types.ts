import {
  createCoreCardButtonProps,
  type IYCoreCardButtonProps,
  type FocusEvent,
  type BlurEvent,
} from '~core/ui/cardButton/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreCardButtonProps extends IYCoreCardButtonProps {}

export interface IYVueCardButtonProps {
  disabled?: IYVueCoreCardButtonProps['disabled']
  hoverable?: IYVueCoreCardButtonProps['hoverable']
  focusable?: IYVueCoreCardButtonProps['focusable']
  size?: IYVueCoreCardButtonProps['size']
  headerText?: IYVueCoreCardButtonProps['headerText']
  annotation?: IYVueCoreCardButtonProps['annotation']
  tagText?: IYVueCoreCardButtonProps['tagText']
  tagVariant?: IYVueCoreCardButtonProps['tagVariant']
  headerIcon?: IYVueCoreCardButtonProps['headerIcon']
}

export const createVueCardButtonProps = (): TDefinedVueProps<IYVueCardButtonProps> => {
  const { disabled, hoverable, focusable, size, headerText, annotation, tagText, tagVariant } = createCoreCardButtonProps()

  return {
    headerText,
    disabled,
    hoverable,
    focusable,
    size,
    annotation,
    tagText,
    tagVariant,
    headerIcon: undefined,
  }
}

export interface IYVueCardButtonEmits {
  (event: 'click', payload: Event): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'blur', payload: BlurEvent): void
}
