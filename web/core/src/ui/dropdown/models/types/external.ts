import type { OffsetOptions, Padding, Placement, Strategy } from '@floating-ui/dom'

export enum EYCoreDropdownPlacement {
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

export enum EYCoreDropdownStrategy {
  ABSOLUTE = 'absolute',
  FIXED = 'fixed',
}

export enum EYCoreDropdownTrigger {
  CLICK = 'click',
  HOVER = 'hover',
  MANUAL = 'manual',
}

export type TEYCoreDropdownTrigger = `${EYCoreDropdownTrigger}`

export interface IYCoreDropdownExternalProps {
  padding: Padding | undefined
  offset: OffsetOptions | undefined
  trigger: TEYCoreDropdownTrigger | undefined
  isOpen: boolean | undefined
  placement: Placement | undefined
  strategy: Strategy | undefined
  transition: string | undefined
  disabled: boolean | undefined
  inline: boolean | undefined
}

export const createCoreDropdownExternalProps = (): IYCoreDropdownExternalProps => ({
  trigger: EYCoreDropdownTrigger.CLICK,
  isOpen: false,
  padding: 0,
  offset: 0,
  placement: EYCoreDropdownPlacement.BOTTOM_START,
  strategy: EYCoreDropdownStrategy.FIXED,
  transition: 'fade',
  disabled: false,
  inline: false,
})
