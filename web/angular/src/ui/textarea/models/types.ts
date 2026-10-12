import { omit } from 'radash'
import {
  createCoreTextareaProps,
  type IYCoreTextareaProps,
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

export type TYNgTextareaModel = IYCoreTextareaProps['value']

export interface IYNgTextareaProps extends Omit<IYCoreTextareaProps, 'value'> {}

export const createNgTextareaProps = (): IYNgTextareaProps => {
  return { ...omit(createCoreTextareaProps(), ['value']) }
}
