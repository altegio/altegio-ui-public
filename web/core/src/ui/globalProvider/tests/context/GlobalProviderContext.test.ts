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
          'должен запрещать прямую мутацию modules через присваивание',
          () => {
            expect(() => {
              context.modules[testModuleId] = testModule
            }).toThrow('[GlobalContext] Прямая мутация модулей запрещена')
          },
        )

        it(
          'должен запрещать прямое удаление из modules',
          () => {
            expect(() => {
              delete context.modules[testModuleId]
            }).toThrow('[GlobalContext] Прямая мутация модулей запрещена')
          },
        )
      },
    )

    describe(
      'putModule',
      () => {
        it(
          'должен добавлять модуль в контекст',
          () => {
            context.putModule(testModule)
            expect(context.getModule(testModule.id)).toBe(testModule)
          },
        )

        it(
          'должен вызывать обработчики обновления при добавлении модуля',
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
          'должен возвращать модуль по id',
          () => {
            context.putModule(testModule)
            expect(context.getModule(testModule.id)).toBe(testModule)
          },
        )

        it(
          'должен возвращать undefined если модуль не найден',
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
          'должен возвращать массив всех модулей',
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
          'должен возвращать пустой массив если нет модулей',
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
          'должен удалять модуль из контекста',
          () => {
            context.putModule(testModule)
            context.removeModule(testModule.id)

            expect(context.getModule(testModule.id)).toBeUndefined()
          },
        )

        it(
          'должен вызывать обработчики обновления при удалении модуля',
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
          'должен возвращать id удаленного модуля',
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
          'должен добавлять обработчик в список обработчиков',
          () => {
            const handler = vi.fn()
            context.onUpdated(handler)

            context.putModule(testModule)

            expect(handler).toHaveBeenCalledWith(testModule)
          },
        )

        it(
          'должен позволять добавлять несколько обработчиков',
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
