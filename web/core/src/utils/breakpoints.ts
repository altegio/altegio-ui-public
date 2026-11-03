import type { ReactiveController, ReactiveControllerHost } from 'lit'
import { BREAKPOINTS, getActiveBreakpoint, type TBreakpointKey } from '~shared/constants/breakpoints'

export type { TBreakpointKey } from '~shared/constants/breakpoints'

export class BreakpointsController implements ReactiveController {
  private width = typeof window === 'undefined' ? 0 : window.innerWidth
  private host: ReactiveControllerHost

  constructor(host: ReactiveControllerHost) {
    this.host = host
    host.addController(this)
    this.onResize = this.onResize.bind(this)
  }

  hostConnected() {
    if (typeof window !== 'undefined') window.addEventListener('resize', this.onResize)
  }

  hostDisconnected() {
    if (typeof window !== 'undefined') window.removeEventListener('resize', this.onResize)
  }

  private onResize = () => {
    const newWidth = window.innerWidth
    if (newWidth !== this.width) {
      this.width = newWidth
      this.host.requestUpdate()
    }
  }

  get active(): TBreakpointKey {
    return getActiveBreakpoint(this.width)
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
