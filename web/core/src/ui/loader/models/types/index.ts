import {
  createCoreLoaderExternalProps,
  type IYCoreLoaderExternalProps,
} from './external'

export * from './external'

export interface IYCoreLoaderProps extends IYCoreLoaderExternalProps {}

export const createCoreLoaderProps = (): IYCoreLoaderProps => {
  const { size, variant } = createCoreLoaderExternalProps()

  return {
    size,
    variant,
  }
}
