import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltSimpleRadioButtonCheckedEvent {
  checked?: boolean
  value?: string | number | boolean | null
}

export class SimpleRadioButtonCheckedEvent extends CustomEvent<IAltSimpleRadioButtonCheckedEvent> {}

export type TAltCoreSimpleRadioButtonEvents = TEventsStoryArgs<{ CheckedEvent: typeof SimpleRadioButtonCheckedEvent }>
