import {
  createCoreFieldTextareaProps,
  type IYCoreFieldTextareaProps,
} from '~core/ui/fieldTextarea/models/types'

export { InputEvent, FocusEvent, BlurEvent, KeydownEvent, RenderEvent } from '~core/ui/fieldTextarea/models/types'

export interface IYNgFieldTextareaProps extends IYCoreFieldTextareaProps {}

export const createNgFieldTextareaProps = (): IYNgFieldTextareaProps => createCoreFieldTextareaProps()
