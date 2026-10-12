export type TSlotTestCase<T = string, K = unknown, E = unknown> = {
  slot: T
  case: string
  content: string
  props?: K
  expected?: E
}
export type TPropTestCase<T, K extends keyof T, E = unknown> = {
  prop: K
  case: string
  value: T[K]
  expected?: E
  additionalProps?: Record<string, unknown>
}

export type TEventTestCase<T = unknown, E = unknown> = {
  event: string
  case: string
  nodeEventName: string
  value?: string
  expected?: E
  details?: Record<string, unknown>
  payload?: T
}
