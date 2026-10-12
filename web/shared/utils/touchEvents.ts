
export interface ITouchDragState<T> {
  active: boolean
  startX: number
  startY: number
  sourceItem: T | null
  targetItem: T | null
  gapValue: number
  touchStartTimeout: ReturnType<typeof setTimeout> | null
  sourceItemClone: T | null
  dragReady: boolean
}

export const isSupportsTouchEvents = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export const TOUCH_DRAG_DELAY = 100
