import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltCoreScrollAreaPosition {

  /** Distance scrolled from the top, in pixels */
  top: number

  /** Distance scrolled from the start edge, in pixels */
  left: number

  /** Share of the vertical scroll range, from 0 to 1 */
  topRatio: number

  /** Share of the horizontal scroll range, from 0 to 1 */
  leftRatio: number
}

export class ScrollAreaScrollEvent extends CustomEvent<IAltCoreScrollAreaPosition> {}

export type TAltCoreScrollAreaEvents = TEventsStoryArgs<{ ScrollChangeEvent: typeof ScrollAreaScrollEvent }>
