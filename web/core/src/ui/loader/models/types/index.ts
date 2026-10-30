import {
  createCoreLoaderExternalProps,
  type IAltCoreLoaderExternalProps,
} from './external'

export * from './external'

export interface IAltCoreLoaderProps extends IAltCoreLoaderExternalProps {}

export const createCoreLoaderProps = (): IAltCoreLoaderProps => {
  const { size, variant } = createCoreLoaderExternalProps()

  return {
    size,
    variant,
  }
}
