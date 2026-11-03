import type { THandler } from '../types'

/**
 * Calls every handler in the list
 * @param {THandler<P>[]} arrayHandlers - Handlers to call
 * @param {P} payload - Argument passed to each handler
 */
export const executeHandlers = <P>(arrayHandlers: THandler<P>[], payload?: P) => {
  arrayHandlers.forEach((handler) => {
    handler(payload)
  })
}

