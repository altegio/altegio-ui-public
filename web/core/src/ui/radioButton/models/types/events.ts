import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IYCoreRadioButtonExternalProps } from './external'

export interface IYRadioButtonCheckedEvent {
  checked: boolean
  value: IYCoreRadioButtonExternalProps['value']
}


export class RadioButtonCheckedEvent extends CustomEvent<IYRadioButtonCheckedEvent> {}

export type TYCoreRadioButtonEvents = TEventsStoryArgs<{ CheckedEvent: typeof RadioButtonCheckedEvent }>
