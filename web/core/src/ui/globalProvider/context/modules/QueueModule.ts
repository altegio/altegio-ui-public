import type { TTimeout } from '~shared/types/global'
import type { THandler, IModuleItem, IModule } from '../types'
import { executeHandlers } from '../utils'

export interface IQueueModuleItem extends IModuleItem {
  timeout?: TTimeout
}

export interface IQueueModule extends IModule {
  defaultDelay?: number
  completedTimeout?: TTimeout | null
  updatedHandlers: THandler<IQueueModuleItem>[]
  completedHandlers: THandler<IQueueModuleItem>[]
  queue: Record<string, IQueueModuleItem>
  putItem: (item: IQueueModuleItem, delay?: number) => IQueueModuleItem
  getItem: (id: string) => IQueueModuleItem | undefined
  removeItem: (id: string) => string
  getItems: () => IQueueModuleItem[]
  clearAll: () => void
  onCompleted: (handler: THandler<IQueueModuleItem>) => void
  onUpdated: (handler: THandler<IQueueModuleItem>) => void
  editDefaultDelay: (defaultDelay: number) => void
}

const MUTATION_ERROR = '[QueueModule] Direct mutation of the queue is not allowed. ' +
  'Use putItem(), removeItem() or clearAll() to change the state.'

/**
 * Queue module
 * @class QueueModule
 * @implements {IQueueModule}
 * @property {TId} id - Module ID
 * @property {number} defaultDelay - Default item delay
 * @property {TTimeout | null} completedTimeout - Timer that completes the queue
 * @property {THandler<IQueueModuleItem>[]} updatedHandlers - Queue update handlers
 * @property {THandler<IQueueModuleItem>[]} completedHandlers - Queue completion handlers
 * @property {Record<TId, IQueueModuleItem>} queue - Queue item storage
 * @method putItem - Adds or replaces a queue item
 * @method getItem - Returns a queue item
 * @method removeItem - Removes a queue item
 * @method getItems - Returns all queue items
 * @method clearAll - Clears the queue
 * @method onCompleted - Registers a queue completion handler
 * @method onUpdated - Registers a queue update handler
 * @method editDefaultDelay - Changes the default delay
 */
export class QueueModule implements IQueueModule {
  id: string
  updatedHandlers: THandler<IQueueModuleItem>[] = []
  completedHandlers: THandler<IQueueModuleItem>[] = []
  completedTimeout?: TTimeout | null
  #queue: Record<string, IQueueModuleItem> = {}
  queue = new Proxy(
    this.#queue,
    {
      set: () => {
        throw new Error(MUTATION_ERROR)
      },
      deleteProperty: () => {
        throw new Error(MUTATION_ERROR)
      },
    },
  )
  defaultDelay?: number

  constructor({ id, defaultDelay }: Pick<IQueueModule, 'id' | 'defaultDelay'>) {
    this.id = id
    this.defaultDelay = defaultDelay
  }

  #clearItemTimeout(item?: IQueueModuleItem) {
    if (!item) return

    if (item.timeout) {
      clearTimeout(item.timeout)
      delete item.timeout
    }
  }
  #setItemTimeout(item: IQueueModuleItem, delay: number) {
    if (delay > 0) {
      item.timeout = setTimeout(
        () => {
          this.removeItem(item.id)

          delete item.timeout
        },
        delay,
      )
    }
  }

  putItem(item: IQueueModuleItem, delay: number = this.defaultDelay ?? 0) {
    this.#clearItemTimeout(item)
    this.#setItemTimeout(
      item,
      delay,
    )

    this.#queue[item.id] = item

    this.#update(this.#queue[item.id])

    return this.#queue[item.id]
  }

  getItem(id: string) {
    return this.#queue[id]
  }

  removeItem(id: string) {
    this.#clearItemTimeout(this.#queue[id])

    delete this.#queue[id]

    this.#update()
    this.#complete()

    return id
  }

  getItems() {
    return Object.values(this.#queue)
  }

  clearAll(callback?: () => void) {
    for (const itemId in this.#queue) {
      if (this.#queue[itemId].timeout) {
        clearTimeout(this.#queue[itemId].timeout)
      }

      delete this.#queue[itemId]
    }

    this.#update()
    this.#complete()

    callback?.()
  }

  #update(item?: IQueueModuleItem) {
    if (this.updatedHandlers.length === 0) return

    executeHandlers(
      this.updatedHandlers,
      item,
    )
  }
  onUpdated(handler: THandler<IQueueModuleItem>) {
    this.updatedHandlers.push(handler)
  }

  #complete(item?: IQueueModuleItem) {
    if (this.completedTimeout) {
      clearTimeout(this.completedTimeout)
      this.completedTimeout = null
    }

    if (Object.keys(this.queue).length !== 0) return
    if (this.completedHandlers.length === 0) return

    this.completedTimeout = setTimeout(
      () => {
        executeHandlers(
          this.completedHandlers,
          item,
        )
      },
      0,
    )
  }
  onCompleted(handler: THandler<IQueueModuleItem>) {
    this.completedHandlers.push(handler)
  }

  editDefaultDelay(delay: number) {
    this.defaultDelay = delay
  }
}
