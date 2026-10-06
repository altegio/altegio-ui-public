import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IGlobalContext } from '../../context'

export interface IYCoreGlobalProviderReadyEvent {
  value: IGlobalContext
}

export class GlobalProviderReadyEvent extends CustomEvent<IYCoreGlobalProviderReadyEvent> {}

export type TYCoreGlobalProviderEvents = TEventsStoryArgs<{
  ReadyEvent: typeof GlobalProviderReadyEvent
}>
