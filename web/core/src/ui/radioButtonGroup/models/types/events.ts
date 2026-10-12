import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IYCoreRadioButtonGroupExternalProps } from './external'

export interface IYCoreRadioButtonGroupChangeEvent {
  value: IYCoreRadioButtonGroupExternalProps['value']
}

export class RadioButtonGroupChangeEvent extends CustomEvent<IYCoreRadioButtonGroupChangeEvent> {}

export type TYCoreRadioButtonGroupEvents = TEventsStoryArgs<{
  ChangeEvent: typeof RadioButtonGroupChangeEvent
}>
