import type { THandler } from '../types'

/**
 * Выполняет все обработчики в массиве
 * @param {THandler<P>[]} arrayHandlers - Массив обработчиков
 * @param {P} payload - Аргумент для обработчиков
 */
export const executeHandlers = <P>(arrayHandlers: THandler<P>[], payload?: P) => {
  arrayHandlers.forEach((handler) => {
    handler(payload)
  })
}

