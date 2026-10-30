import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IAltCoreRadioButtonGroupExternalProps } from './external'

export interface IAltCoreRadioButtonGroupChangeEvent {
  value: IAltCoreRadioButtonGroupExternalProps['value']
}

export class RadioButtonGroupChangeEvent extends CustomEvent<IAltCoreRadioButtonGroupChangeEvent> {}

export type TAltCoreRadioButtonGroupEvents = TEventsStoryArgs<{
  ChangeEvent: typeof RadioButtonGroupChangeEvent
}>
