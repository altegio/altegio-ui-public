import { omit } from 'radash'
import {
  createCoreTextareaProps,
  type IAltCoreTextareaProps,
} from '~core/ui/textarea/models/types'

export {
  InputEvent,
  FocusEvent,
  BlurEvent,
  ClearEvent,
  KeydownEvent,
  ClickOutsideEvent,
  MouseEnterEvent,
  MouseLeaveEvent,
  RenderEvent,
} from '~core/ui/textarea/models/types'

export type TAltNgTextareaModel = IAltCoreTextareaProps['value']

export interface IAltNgTextareaProps extends Omit<IAltCoreTextareaProps, 'value'> {}

export const createNgTextareaProps = (): IAltNgTextareaProps => {
  return { ...omit(createCoreTextareaProps(), ['value']) }
}
