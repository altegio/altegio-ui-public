import { describe, expect, it, beforeEach, vi } from 'vitest'

import {
  GlobalContext,
  QueueModule,
  type TGlobalContextModule,
} from '~core/ui/globalProvider/context'

describe(
  'Core/YCoreGlobalProvider/GlobalContext',
  () => {
    let context: GlobalContext
    let testModule: TGlobalContextModule
    const testModuleId = 'test-module'

    beforeEach(() => {
      context = new GlobalContext()
      testModule = new QueueModule({ id: testModuleId })
    })

    describe(
      'modules mutation',
      () => {
        it(
          'should forbid direct mutation of modules through assignment',
          () => {
            expect(() => {
              context.modules[testModuleId] = testModule
            }).toThrow('[GlobalContext] Direct mutation of modules is not allowed')
          },
        )

        it(
          'should forbid direct deletion from modules',
          () => {
            expect(() => {
              delete context.modules[testModuleId]
            }).toThrow('[GlobalContext] Direct mutation of modules is not allowed')
          },
        )
      },
    )

    describe(
      'putModule',
      () => {
        it(
          'should add a module to the context',
          () => {
            context.putModule(testModule)
            expect(context.getModule(testModule.id)).toBe(testModule)
          },
        )

        it(
          'should call the update handlers when a module is added',
          () => {
            const handler = vi.fn()
            context.onUpdated(handler)

            context.putModule(testModule)

            expect(handler).toHaveBeenCalledWith(testModule)
          },
        )
      },
    )

    describe(
      'getModule',
      () => {
        it(
          'should return a module by id',
          () => {
            context.putModule(testModule)
            expect(context.getModule(testModule.id)).toBe(testModule)
          },
        )

        it(
          'should return undefined when the module is not found',
          () => {
            expect(context.getModule('non-existent')).toBeUndefined()
          },
        )
      },
    )

    describe(
      'getModules',
      () => {
        it(
          'should return an array of all modules',
          () => {
            const module1 = new QueueModule({ id: 'module-1' })
            const module2 = new QueueModule({ id: 'module-2' })

            context.putModule(module1)
            context.putModule(module2)

            expect(context.getModules()).toEqual([
              module1,
              module2,
            ])
          },
        )

        it(
          'should return an empty array when there are no modules',
          () => {
            expect(context.getModules()).toEqual([])
          },
        )
      },
    )

    describe(
      'removeModule',
      () => {
        it(
          'should remove a module from the context',
          () => {
            context.putModule(testModule)
            context.removeModule(testModule.id)

            expect(context.getModule(testModule.id)).toBeUndefined()
          },
        )

        it(
          'should call the update handlers when a module is removed',
          () => {
            const handler = vi.fn()
            context.onUpdated(handler)

            context.putModule(testModule)
            context.removeModule(testModule.id)

            expect(handler).toHaveBeenCalledTimes(2)
            expect(handler).toHaveBeenLastCalledWith(undefined)
          },
        )

        it(
          'should return the id of the removed module',
          () => {
            context.putModule(testModule)
            expect(context.removeModule(testModule.id)).toBe(testModule.id)
          },
        )
      },
    )

    describe(
      'onUpdated',
      () => {
        it(
          'should add a handler to the handler list',
          () => {
            const handler = vi.fn()
            context.onUpdated(handler)

            context.putModule(testModule)

            expect(handler).toHaveBeenCalledWith(testModule)
          },
        )

        it(
          'should allow adding several handlers',
          () => {
            const handler1 = vi.fn()
            const handler2 = vi.fn()

            context.onUpdated(handler1)
            context.onUpdated(handler2)

            context.putModule(testModule)

            expect(handler1).toHaveBeenCalledWith(testModule)
            expect(handler2).toHaveBeenCalledWith(testModule)
          },
        )
      },
    )
  },
)
