import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IAltCoreDatePickerExternalProps } from './external'

export interface IAltCoreDatePickerPickEvent {
  value: IAltCoreDatePickerExternalProps['date']
}

export class PickEvent extends CustomEvent<IAltCoreDatePickerPickEvent> {}

export type TAltCoreDatePickerEvents = TEventsStoryArgs<{ PickEvent: typeof PickEvent }>
