import type { TAnyVoidFunction } from '~shared/types/utils'

export type TExtractEventName<T> = T extends `${infer Name}Event` ? `on${Name}` : never

export type TEventsStoryArgs<T> = {
  [K in keyof T as TExtractEventName<K>]: TAnyVoidFunction
}

export type TOmitReqProp<T> = {
  [K in keyof T as undefined extends T[K] ? K : never]: T[K];
}
