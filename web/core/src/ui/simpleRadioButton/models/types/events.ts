import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IYSimpleRadioButtonCheckedEvent {
  checked?: boolean
  value?: string | number | boolean | null
}

export class SimpleRadioButtonCheckedEvent extends CustomEvent<IYSimpleRadioButtonCheckedEvent> {}

export type TYCoreSimpleRadioButtonEvents = TEventsStoryArgs<{ CheckedEvent: typeof SimpleRadioButtonCheckedEvent }>
