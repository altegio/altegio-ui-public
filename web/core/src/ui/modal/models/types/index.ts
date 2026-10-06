import {
  type IYCoreModalExternalProps,
  createCoreModalExternalProps,
} from './external'

export * from './external'

export interface IYCoreModalProps extends IYCoreModalExternalProps {}

export const createCoreModalProps = (): IYCoreModalProps => {
  return { ...createCoreModalExternalProps() }
}
