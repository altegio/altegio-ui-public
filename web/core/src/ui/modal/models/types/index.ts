import {
  type IAltCoreModalExternalProps,
  createCoreModalExternalProps,
} from './external'

export * from './external'

export interface IAltCoreModalProps extends IAltCoreModalExternalProps {}

export const createCoreModalProps = (): IAltCoreModalProps => {
  return { ...createCoreModalExternalProps() }
}
