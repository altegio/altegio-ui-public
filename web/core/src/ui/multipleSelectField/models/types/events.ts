import type { IAltCoreMultipleSelectFieldExternalProps } from './external'
export { FocusEvent, BlurEvent, InputEvent, VisibleEvent } from '~core/ui/selectField/models/types/events'

export interface IAltCoreSelectFieldEvents {
  value: IAltCoreMultipleSelectFieldExternalProps['value']
}
export class SelectEvent extends CustomEvent<IAltCoreSelectFieldEvents> {}
