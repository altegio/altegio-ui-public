import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export class ClickIconEmitEvent extends CustomEvent<PointerEvent> {}

export type TYCoreSimpleChipEvents = TEventsStoryArgs<{
  ClickIconEmitEvent: typeof ClickIconEmitEvent
}>
