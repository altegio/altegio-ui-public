import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreCardSelectProps,
  type IYCoreCardSelectProps,
  type FocusEvent,
  type BlurEvent,
} from '~core/ui/cardSelect/models/types'

export interface IYVueCoreCardSelectProps extends IYCoreCardSelectProps {}

export interface IYVueCardSelectProps {
  checked?: IYVueCoreCardSelectProps['checked']
  disabled?: IYVueCoreCardSelectProps['disabled']
  hoverable?: IYVueCoreCardSelectProps['hoverable']
  focusable?: IYVueCoreCardSelectProps['focusable']
  size?: IYVueCoreCardSelectProps['size']
  headerText?: IYVueCoreCardSelectProps['headerText']
  annotation?: IYVueCoreCardSelectProps['annotation']
  tagText?: IYVueCoreCardSelectProps['tagText']
  tagVariant?: IYVueCoreCardSelectProps['tagVariant']
  headerIcon?: IYVueCoreCardSelectProps['headerIcon']
}

export const createVueCardSelectProps = (): TDefinedVueProps<IYVueCardSelectProps> => {
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

export interface IYVueCardSelectEmits {
  (event: 'click', payload: Event): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'blur', payload: BlurEvent): void
}
