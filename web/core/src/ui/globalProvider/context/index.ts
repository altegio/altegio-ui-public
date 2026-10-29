import type { THandler } from './types'
import type { IQueueModule, ILocaleModule } from './modules'
import { executeHandlers } from './utils'
import type { IPaletteModule } from './modules/PaletteModule'

export * from './modules'
export * from './types'
export * from './constants'
export * from './utils'

export type TGlobalContextModule = IQueueModule | ILocaleModule | IPaletteModule

export interface IGlobalContext {
  updatedHandlers: THandler<TGlobalContextModule>[]
  modules: Record<string, TGlobalContextModule>
  onUpdated: (handler: THandler<TGlobalContextModule>) => void
  clearHandler: (handler: THandler<TGlobalContextModule>) => void
  putModule: (module: TGlobalContextModule) => TGlobalContextModule
  getModule: (id: string) => TGlobalContextModule | undefined
  getModules: () => TGlobalContextModule[]
  removeModule: (id: string) => string
}

const MUTATION_ERROR = '[GlobalContext] Direct mutation of modules is not allowed. ' +
  'Use putModule and removeModule to manage modules.'

/**
 * Global context that manages the modules
 * @interface IGlobalContext
 * @property {THandler<TGlobalContextModule>[]} updatedHandlers - Module update handlers
 * @property {Record<TId, TGlobalContextModule>} modules - Module storage
 * @method onUpdated - Registers a module update handler
 * @method clearHandler - Removes a module update handler
 * @method putModule - Adds or replaces a module in the context
 * @method getModule - Returns a module by ID
 * @method getModules - Returns all modules
 * @method removeModule - Removes a module from the context
 */
export class GlobalContext implements IGlobalContext {
  updatedHandlers: THandler<TGlobalContextModule>[] = []
  private modulesData: Record<string, TGlobalContextModule> = {}
  readonly modules: Record<string, TGlobalContextModule>

  constructor() {
    this.modules = new Proxy(this.modulesData, {
      set: () => {
        throw new Error(MUTATION_ERROR)
      },
      deleteProperty: () => {
        throw new Error(MUTATION_ERROR)
      },
    })
  }

  putModule(module: TGlobalContextModule) {
    this.modulesData[module.id] = module
    this.update(this.modulesData[module.id])
    return this.modulesData[module.id]
  }

  getModule(id: string) {
    return this.modulesData[id]
  }

  getModules() {
    return Object.values(this.modulesData)
  }

  removeModule(id: string) {
    delete this.modulesData[id]
    this.update()
    return id
  }

  update(module?: TGlobalContextModule) {
    executeHandlers(
      this.updatedHandlers,
      module,
    )
  }

  onUpdated(handler: THandler<TGlobalContextModule>) {
    this.updatedHandlers.push(handler)
  }

  clearHandler(handler: THandler<TGlobalContextModule>) {
    const handlerIndex = this.updatedHandlers.indexOf(handler)
    if (handlerIndex >= 0) {
      this.updatedHandlers.splice(handlerIndex, 1)
    }
  }
}
