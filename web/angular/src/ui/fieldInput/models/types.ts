import {
  createCoreFieldInputProps,
  type IAltCoreFieldInputProps,
} from '~core/ui/fieldInput/models/types'

export { InputEvent as AltNgFieldInputInputEvent, FocusEvent as AltNgFieldInputFocusEvent, BlurEvent as AltNgFieldInputBlurEvent, KeydownEvent as AltNgFieldInputKeydownEvent, RenderEvent as AltNgFieldInputRenderEvent } from '~core/ui/fieldInput/models/types'

export interface IAltNgFieldInputProps extends IAltCoreFieldInputProps {}

export const createNgFieldInputProps = (): IAltNgFieldInputProps => createCoreFieldInputProps()
