import {
  createCoreTextExternalProps,
  type IYCoreTextExternalProps,
} from './external'

export * from './external'

export interface IYCoreTextProps extends IYCoreTextExternalProps {}

export const createCoreTextProps = (): IYCoreTextProps => {
  return { ...createCoreTextExternalProps() }
}
