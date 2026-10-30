import {
  createCoreCardButtonProps,
  type IAltCoreCardButtonProps,
  type FocusEvent,
  type BlurEvent,
} from '~core/ui/cardButton/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreCardButtonProps extends IAltCoreCardButtonProps {}

export interface IAltVueCardButtonProps {
  disabled?: IAltVueCoreCardButtonProps['disabled']
  hoverable?: IAltVueCoreCardButtonProps['hoverable']
  focusable?: IAltVueCoreCardButtonProps['focusable']
  size?: IAltVueCoreCardButtonProps['size']
  headerText?: IAltVueCoreCardButtonProps['headerText']
  annotation?: IAltVueCoreCardButtonProps['annotation']
  tagText?: IAltVueCoreCardButtonProps['tagText']
  tagVariant?: IAltVueCoreCardButtonProps['tagVariant']
  headerIcon?: IAltVueCoreCardButtonProps['headerIcon']
}

export const createVueCardButtonProps = (): TDefinedVueProps<IAltVueCardButtonProps> => {
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

export interface IAltVueCardButtonEmits {
  (event: 'click', payload: Event): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'blur', payload: BlurEvent): void
}
