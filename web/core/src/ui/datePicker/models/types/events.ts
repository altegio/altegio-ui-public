import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IYCoreDatePickerExternalProps } from './external'

export interface IYCoreDatePickerPickEvent {
  value: IYCoreDatePickerExternalProps['date']
}

export class PickEvent extends CustomEvent<IYCoreDatePickerPickEvent> {}

export type TYCoreDatePickerEvents = TEventsStoryArgs<{ PickEvent: typeof PickEvent }>
