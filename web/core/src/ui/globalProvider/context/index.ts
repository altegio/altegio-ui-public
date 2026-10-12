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

const MUTATION_ERROR = '[GlobalContext] Прямая мутация модулей запрещена. ' +
  'Используйте методы putModule и removeModule для управления модулями.'

/**
 * Глобальный контекст для управления модулями
 * @interface IGlobalContext
 * @property {THandler<TGlobalContextModule>[]} updatedHandlers - Массив обработчиков обновлений модулей
 * @property {Record<TId, TGlobalContextModule>} modules - Хранилище модулей
 * @method onUpdated - Хук для обработчиков обновлений модулей
 * @method clearHandler - Удаляет хук для обработчиков обновлений модулей
 * @method putModule - Добавляет/редактирует модуль в контекст
 * @method getModule - Получает модуль по идентификатору
 * @method getModules - Получает все модули
 * @method removeModule - Удаляет модуль из контекста
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
