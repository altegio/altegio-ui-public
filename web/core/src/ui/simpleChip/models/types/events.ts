import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export class ClickIconEmitEvent extends CustomEvent<PointerEvent> {}

export type TAltCoreSimpleChipEvents = TEventsStoryArgs<{
  ClickIconEmitEvent: typeof ClickIconEmitEvent
}>
