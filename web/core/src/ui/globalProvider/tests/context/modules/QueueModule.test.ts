import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'

import {
  QueueModule,
  type IQueueModuleItem,
} from '~core/ui/globalProvider/context'

describe(
  'Core/AltCoreGlobalProvider/QueueModule',
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
          'should add an item to the queue',
          () => {
            const item: IQueueModuleItem = { id: 'item-1' }
            queueModule.putItem(item)

            expect(queueModule.getItem('item-1')).toBe(item)
          },
        )

        it(
          'should set a timeout for the item',
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
          'should remove an item from the queue',
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
          'should return all queue items',
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
          'should clear the whole queue',
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
          'should call the callback after clearing',
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
          'should call the handler when the queue updates',
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
          'should call the handler when the queue is empty',
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
          'should change defaultDelay',
          () => {
            queueModule.editDefaultDelay(2000)
            expect(queueModule.defaultDelay).toBe(2000)
          },
        )
      },
    )

    describe(
      'direct mutation',
      () => {
        it(
          'should forbid direct mutation of the queue',
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
