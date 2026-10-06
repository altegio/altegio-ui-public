import { ref, computed } from 'vue'
import { throttle } from 'radash'
import { BREAKPOINTS } from '~shared/constants/breakpoints'

export type TBreakpointKey = keyof typeof BREAKPOINTS

const width = ref(window.document.documentElement.clientWidth)

const updateWidth = throttle({ interval: 50 }, () => { width.value = window.document.documentElement.clientWidth })

if (typeof window !== 'undefined') {
  window.addEventListener('resize', updateWidth)
}

export const active = computed(() => {
  const entries = Object.entries(BREAKPOINTS) as [TBreakpointKey, number][]
  entries.sort((a, b) => a[1] - b[1])

  for (const [key] of entries) {
    if (smallerOrEqual(key).value) return key
  }

  return undefined
})

export const between = (minKey: TBreakpointKey, maxKey: TBreakpointKey) => computed(() => width.value >= BREAKPOINTS[minKey] && width.value <= BREAKPOINTS[maxKey])

export const greater = (key: TBreakpointKey) => computed(() => width.value > BREAKPOINTS[key])

export const greaterOrEqual = (key: TBreakpointKey) => computed(() => width.value >= BREAKPOINTS[key])

export const smaller = (key: TBreakpointKey) => computed(() => width.value < BREAKPOINTS[key])

export const smallerOrEqual = (key: TBreakpointKey) => computed(() => width.value <= BREAKPOINTS[key])
