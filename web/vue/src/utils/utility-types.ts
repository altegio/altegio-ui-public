import type { TOmitReqProp } from '~core/utils/helpers-utility-types'

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
type NativeType = null | number | string | boolean | symbol | Function

// eslint-disable-next-line sonarjs/no-useless-intersection
type InferDefault<P, T> = ((props: P) => T & {}) | (T extends NativeType ? T : never)
type InferDefaults<T> = {
  [K in keyof T]?: InferDefault<T, T[K]>;
}
type TLooseRequired<T> = {
  [P in keyof (T & Required<T>)]: T[P];
}

type TNonUndefined<T> = T extends undefined ? never : T

type TNonUndefinedProps<T> = {
  [K in keyof T]: TNonUndefined<T[K]>
}

export type TDefinedVueProps<T> = TLooseRequired<InferDefaults<TOmitReqProp<TNonUndefinedProps<T>>>>
