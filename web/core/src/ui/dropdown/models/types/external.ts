import type { OffsetOptions, Padding, Placement, Strategy } from '@floating-ui/dom'

export enum EAltCoreDropdownPlacement {
  TOP = 'top',
  TOP_START = 'top-start',
  TOP_END = 'top-end',
  BOTTOM = 'bottom',
  BOTTOM_START = 'bottom-start',
  BOTTOM_END = 'bottom-end',
  LEFT = 'left',
  LEFT_START = 'left-start',
  LEFT_END = 'left-end',
  RIGHT = 'right',
  RIGHT_START = 'right-start',
  RIGHT_END = 'right-end',
}

export enum EAltCoreDropdownStrategy {
  ABSOLUTE = 'absolute',
  FIXED = 'fixed',
}

export enum EAltCoreDropdownTrigger {
  CLICK = 'click',
  HOVER = 'hover',
  MANUAL = 'manual',
}

export type TEAltCoreDropdownTrigger = `${EAltCoreDropdownTrigger}`

export interface IAltCoreDropdownExternalProps {
  padding: Padding | undefined
  offset: OffsetOptions | undefined
  trigger: TEAltCoreDropdownTrigger | undefined
  isOpen: boolean | undefined
  placement: Placement | undefined
  strategy: Strategy | undefined
  transition: string | undefined
  disabled: boolean | undefined
  inline: boolean | undefined
}

export const createCoreDropdownExternalProps = (): IAltCoreDropdownExternalProps => ({
  trigger: EAltCoreDropdownTrigger.CLICK,
  isOpen: false,
  padding: 0,
  offset: 0,
  placement: EAltCoreDropdownPlacement.BOTTOM_START,
  strategy: EAltCoreDropdownStrategy.FIXED,
  transition: 'fade',
  disabled: false,
  inline: false,
})
