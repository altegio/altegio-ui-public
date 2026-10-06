import type { ReactiveController, ReactiveControllerHost } from 'lit'
import { BREAKPOINTS } from '~shared/constants/breakpoints'

export type TBreakpointKey = keyof typeof BREAKPOINTS

export class BreakpointsController implements ReactiveController {
  private width = window.innerWidth
  private host: ReactiveControllerHost

  constructor(host: ReactiveControllerHost) {
    this.host = host
    host.addController(this)
    this.onResize = this.onResize.bind(this)
  }

  hostConnected() {
    window.addEventListener('resize', this.onResize)
  }

  hostDisconnected() {
    window.removeEventListener('resize', this.onResize)
  }

  private onResize = () => {
    const newWidth = window.innerWidth
    if (newWidth !== this.width) {
      this.width = newWidth
      this.host.requestUpdate()
    }
  }

  get active(): TBreakpointKey {
    const entries = Object.entries(BREAKPOINTS) as [TBreakpointKey, number][]
    entries.sort((a, b) => a[1] - b[1])
    let current: TBreakpointKey = entries[0][0]
    for (const [key, value] of entries) {
      if (this.width >= value) {
        current = key
      } else {
        break
      }
    }
    return current
  }

  between(minKey: TBreakpointKey, maxKey: TBreakpointKey): boolean {
    return this.width >= BREAKPOINTS[minKey] && this.width <= BREAKPOINTS[maxKey]
  }

  greater(key: TBreakpointKey): boolean {
    return this.width > BREAKPOINTS[key]
  }

  greaterOrEqual(key: TBreakpointKey): boolean {
    return this.width >= BREAKPOINTS[key]
  }

  smaller(key: TBreakpointKey): boolean {
    return this.width < BREAKPOINTS[key]
  }

  smallerOrEqual(key: TBreakpointKey): boolean {
    return this.width <= BREAKPOINTS[key]
  }
}
