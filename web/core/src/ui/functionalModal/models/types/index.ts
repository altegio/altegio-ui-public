import {
  type IYCoreFunctionalModalExternalProps,
  createCoreFunctionalModalExternalProps,
} from './external'

export * from './external'

export interface IYCoreFunctionalModalProps extends IYCoreFunctionalModalExternalProps {}

export const createCoreFunctionalModalProps = (): IYCoreFunctionalModalProps => {
  return { ...createCoreFunctionalModalExternalProps() }
}
