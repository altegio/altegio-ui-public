import {
  createCoreFieldInputProps,
  type IYCoreFieldInputProps,
} from '~core/ui/fieldInput/models/types'

export { InputEvent as YNgFieldInputInputEvent, FocusEvent as YNgFieldInputFocusEvent, BlurEvent as YNgFieldInputBlurEvent, KeydownEvent as YNgFieldInputKeydownEvent, RenderEvent as YNgFieldInputRenderEvent } from '~core/ui/fieldInput/models/types'

export interface IYNgFieldInputProps extends IYCoreFieldInputProps {}

export const createNgFieldInputProps = (): IYNgFieldInputProps => createCoreFieldInputProps()
