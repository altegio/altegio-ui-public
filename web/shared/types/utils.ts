export type TValueOf<T> = T[keyof T]

export type TAddPrefixToObject<T, P extends string> = {
  [K in keyof T as K extends string ? `${P}${Capitalize<K>}` : never]: T[K]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TAnyVoidFunction = (...args: any[]) => void
