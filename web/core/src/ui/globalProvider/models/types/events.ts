import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IGlobalContext } from '../../context'

export interface IAltCoreGlobalProviderReadyEvent {
  value: IGlobalContext
}

export class GlobalProviderReadyEvent extends CustomEvent<IAltCoreGlobalProviderReadyEvent> {}

export type TAltCoreGlobalProviderEvents = TEventsStoryArgs<{
  ReadyEvent: typeof GlobalProviderReadyEvent
}>
