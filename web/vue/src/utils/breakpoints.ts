import { ref, computed } from 'vue'
import { throttle } from 'radash'
import { BREAKPOINTS, getActiveBreakpoint, type TBreakpointKey } from '~shared/constants/breakpoints'

export type { TBreakpointKey } from '~shared/constants/breakpoints'

const width = ref(typeof window === 'undefined' ? 0 : window.document.documentElement.clientWidth)

const updateWidth = throttle({ interval: 50 }, () => { width.value = window.document.documentElement.clientWidth })

if (typeof window !== 'undefined') {
  window.addEventListener('resize', updateWidth)
}

export const active = computed(() => {
  return getActiveBreakpoint(width.value)
})

export const between = (minKey: TBreakpointKey, maxKey: TBreakpointKey) => computed(() => width.value >= BREAKPOINTS[minKey] && width.value <= BREAKPOINTS[maxKey])

export const greater = (key: TBreakpointKey) => computed(() => width.value > BREAKPOINTS[key])

export const greaterOrEqual = (key: TBreakpointKey) => computed(() => width.value >= BREAKPOINTS[key])

export const smaller = (key: TBreakpointKey) => computed(() => width.value < BREAKPOINTS[key])

export const smallerOrEqual = (key: TBreakpointKey) => computed(() => width.value <= BREAKPOINTS[key])
