import {
  createCoreFieldTextareaProps,
  type IAltCoreFieldTextareaProps,
} from '~core/ui/fieldTextarea/models/types'

export { InputEvent, FocusEvent, BlurEvent, KeydownEvent, RenderEvent } from '~core/ui/fieldTextarea/models/types'

export interface IAltNgFieldTextareaProps extends IAltCoreFieldTextareaProps {}

export const createNgFieldTextareaProps = (): IAltNgFieldTextareaProps => createCoreFieldTextareaProps()
