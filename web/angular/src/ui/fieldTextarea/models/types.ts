import {
  createCoreFieldTextareaProps,
  type IAltCoreFieldTextareaInternalProps,
  type IAltCoreFieldTextareaProps,
} from '~core/ui/fieldTextarea/models/types'

export { InputEvent, FocusEvent, BlurEvent, KeydownEvent, RenderEvent } from '~core/ui/fieldTextarea/models/types'

export interface IAltNgFieldTextareaProps extends Omit<IAltCoreFieldTextareaProps, keyof IAltCoreFieldTextareaInternalProps> {}

export const createNgFieldTextareaProps = (): IAltNgFieldTextareaProps => createCoreFieldTextareaProps()
