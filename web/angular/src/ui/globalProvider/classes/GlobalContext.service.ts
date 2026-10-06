import { Injectable, signal } from '@angular/core'
import type { IGlobalContext } from '~core/ui/globalProvider/context'

@Injectable({ providedIn: 'root' })
export class GlobalContextService {
  private globalContext = signal<IGlobalContext | undefined>(undefined)

  setContext(context: IGlobalContext) {
    this.globalContext.set(context)
  }

  getContext() {
    return this.globalContext
  }
}
