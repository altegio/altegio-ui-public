import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltCoreVirtualScrollRange {

  /** Index of the first item to render */
  start: number

  /** Index after the last item to render */
  end: number
}

export class VirtualScrollRangeChangeEvent extends CustomEvent<IAltCoreVirtualScrollRange> {}

export type TAltCoreVirtualScrollEvents = TEventsStoryArgs<{ RangeChangeEvent: typeof VirtualScrollRangeChangeEvent }>
