import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export class ClickIconEmitEvent extends CustomEvent<PointerEvent> {}

export type TYCoreTagEvents = TEventsStoryArgs<{
  ClickIconEmitEvent: typeof ClickIconEmitEvent
}>
