import type { MiddlewareData, Placement } from '@floating-ui/dom'

export const getArrowStyles = (middlewareData: MiddlewareData, placement: Placement): Partial<CSSStyleDeclaration> => {
  const { arrow: arrowData } = middlewareData
  if (!arrowData) return {}

  const { x, y } = arrowData
  const baseStyles = {
    top: y != null
      ? `${y}px`
      : '',
    left: x != null
      ? `${x}px`
      : '',
    right: '',
    bottom: '',
    transform: '',
  }

  const placementStyles = {
    top: { top: 'calc(100% - 1px)' },
    right: {
      right: 'calc(100% - 10px)',
      transform: 'rotate(0.25turn)',
    },
    bottom: {
      bottom: 'calc(100% - 1px)',
      transform: 'rotate(0.5turn)',
    },
    left: {
      left: 'calc(100% - 10px)',
      transform: 'rotate(-0.25turn)',
    },
  }

  const direction = placement.split('-')[0] as keyof typeof placementStyles
  return {
    ...baseStyles,
    ...placementStyles[direction],
  }
}
