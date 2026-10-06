import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'

import {
  QueueModule,
  type IQueueModuleItem,
} from '~core/ui/globalProvider/context'

describe(
  'Core/YCoreGlobalProvider/QueueModule',
  () => {
    let queueModule: QueueModule

    beforeEach(() => {
      queueModule = new QueueModule({ id: 'test-queue', defaultDelay: 1000 })
      vi.useFakeTimers()
      vi.spyOn(
        window,
        'setTimeout',
      )
    })

    afterEach(() => {
      vi.clearAllTimers()
      vi.useRealTimers()
    })

    describe(
      'putItem',
      () => {
        it(
          'должен добавлять элемент в очередь',
          () => {
            const item: IQueueModuleItem = { id: 'item-1' }
            queueModule.putItem(item)

            expect(queueModule.getItem('item-1')).toBe(item)
          },
        )

        it(
          'должен устанавливать таймаут для элемента',
          () => {
            const item: IQueueModuleItem = { id: 'item-1' }
            queueModule.putItem(
              item,
              2000,
            )

            expect(setTimeout).toHaveBeenCalledTimes(1)
            expect(setTimeout).toHaveBeenLastCalledWith(
              expect.any(Function),
              2000,
            )
          },
        )
      },
    )

    describe(
      'removeItem',
      () => {
        it(
          'должен удалять элемент из очереди',
          () => {
            const item: IQueueModuleItem = { id: 'item-1' }
            queueModule.putItem(item)
            queueModule.removeItem('item-1')

            expect(queueModule.getItem('item-1')).toBeUndefined()
          },
        )
      },
    )

    describe(
      'getItems',
      () => {
        it(
          'должен возвращать все элементы очереди',
          () => {
            const items: IQueueModuleItem[] = [
              { id: 'item-1' },
              { id: 'item-2' },
            ]

            items.forEach((item) => queueModule.putItem(item))

            expect(queueModule.getItems()).toHaveLength(2)
            expect(queueModule.getItems()).toEqual(expect.arrayContaining(items))
          },
        )
      },
    )

    describe(
      'clearAll',
      () => {
        it(
          'должен очищать всю очередь',
          () => {
            const items: IQueueModuleItem[] = [
              { id: 'item-1' },
              { id: 'item-2' },
            ]

            items.forEach((item) => queueModule.putItem(item))
            queueModule.clearAll()

            expect(queueModule.getItems()).toHaveLength(0)
          },
        )

        it(
          'должен вызывать callback после очистки',
          () => {
            const callback = vi.fn()
            queueModule.clearAll(callback)

            expect(callback).toHaveBeenCalledTimes(1)
          },
        )
      },
    )

    describe(
      'onUpdated',
      () => {
        it(
          'должен вызывать обработчик при обновлении очереди',
          () => {
            const handler = vi.fn()
            const item: IQueueModuleItem = { id: 'item-1' }

            queueModule.onUpdated(handler)
            queueModule.putItem(item)

            expect(handler).toHaveBeenCalledWith(item)
          },
        )
      },
    )

    describe(
      'onCompleted',
      () => {
        it(
          'должен вызывать обработчик когда очередь пуста',
          () => {
            const handler = vi.fn()
            const item: IQueueModuleItem = { id: 'item-1' }

            queueModule.onCompleted(handler)
            queueModule.putItem(item)
            queueModule.removeItem('item-1')

            vi.runAllTimers()

            expect(handler).toHaveBeenCalled()
          },
        )
      },
    )

    describe(
      'editDefaultDelay',
      () => {
        it(
          'должен изменять значение defaultDelay',
          () => {
            queueModule.editDefaultDelay(2000)
            expect(queueModule.defaultDelay).toBe(2000)
          },
        )
      },
    )

    describe(
      'прямая мутация',
      () => {
        it(
          'должен запрещать прямую мутацию очереди',
          () => {
            expect(() => {
              queueModule.queue.test = { id: 'test' }
            }).toThrow()

            expect(() => {
              delete queueModule.queue.test
            }).toThrow()
          },
        )
      },
    )
  },
)
