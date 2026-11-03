import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreCardSelectProps,
  type IAltCoreCardSelectProps,
  type FocusEvent,
  type BlurEvent,
} from '~core/ui/cardSelect/models/types'

export interface IAltVueCoreCardSelectProps extends IAltCoreCardSelectProps {}

export interface IAltVueCardSelectProps {
  checked?: IAltVueCoreCardSelectProps['checked']
  disabled?: IAltVueCoreCardSelectProps['disabled']
  hoverable?: IAltVueCoreCardSelectProps['hoverable']
  focusable?: IAltVueCoreCardSelectProps['focusable']
  size?: IAltVueCoreCardSelectProps['size']
  headerText?: IAltVueCoreCardSelectProps['headerText']
  annotation?: IAltVueCoreCardSelectProps['annotation']
  tagText?: IAltVueCoreCardSelectProps['tagText']
  tagVariant?: IAltVueCoreCardSelectProps['tagVariant']
  headerIcon?: IAltVueCoreCardSelectProps['headerIcon']
}

export const createVueCardSelectProps = (): TDefinedVueProps<IAltVueCardSelectProps> => {
  const { checked, disabled, hoverable, focusable, size, headerText, annotation, tagText, tagVariant } = createCoreCardSelectProps()

  return {
    headerText,
    checked,
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

export interface IAltVueCardSelectEmits {
  (event: 'click', payload: Event): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'blur', payload: BlurEvent): void
}
