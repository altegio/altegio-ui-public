import type { IYCoreMultipleSelectFieldExternalProps } from './external'
export { FocusEvent, BlurEvent, InputEvent, VisibleEvent } from '~core/ui/selectField/models/types/events'

export interface IYCoreSelectFieldEvents {
  value: IYCoreMultipleSelectFieldExternalProps['value']
}
export class SelectEvent extends CustomEvent<IYCoreSelectFieldEvents> {}
