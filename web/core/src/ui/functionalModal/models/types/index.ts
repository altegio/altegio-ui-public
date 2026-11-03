import {
  type IAltCoreFunctionalModalExternalProps,
  createCoreFunctionalModalExternalProps,
} from './external'

export * from './external'

export interface IAltCoreFunctionalModalProps extends IAltCoreFunctionalModalExternalProps {}

export const createCoreFunctionalModalProps = (): IAltCoreFunctionalModalProps => {
  return { ...createCoreFunctionalModalExternalProps() }
}
