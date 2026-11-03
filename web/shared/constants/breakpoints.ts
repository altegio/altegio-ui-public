export const BREAKPOINTS = {
  XS: 599,
  SM: 904,
  MD: 1239,
  LG: 1280,
} as const

export type TBreakpointKey = keyof typeof BREAKPOINTS

export function getActiveBreakpoint(width: number): TBreakpointKey {
  const entries = Object.entries(BREAKPOINTS) as [TBreakpointKey, number][]
  return entries.find(([, maxWidth]) => width <= maxWidth)?.[0] ?? entries[entries.length - 1][0]
}
