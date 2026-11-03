import {
  createCoreTextExternalProps,
  type IAltCoreTextExternalProps,
} from './external'

export * from './external'

export interface IAltCoreTextProps extends IAltCoreTextExternalProps {}

export const createCoreTextProps = (): IAltCoreTextProps => {
  return { ...createCoreTextExternalProps() }
}
