import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IAltCoreRadioButtonExternalProps } from './external'

export interface IAltRadioButtonCheckedEvent {
  checked: boolean
  value: IAltCoreRadioButtonExternalProps['value']
}


export class RadioButtonCheckedEvent extends CustomEvent<IAltRadioButtonCheckedEvent> {}

export type TAltCoreRadioButtonEvents = TEventsStoryArgs<{ CheckedEvent: typeof RadioButtonCheckedEvent }>
