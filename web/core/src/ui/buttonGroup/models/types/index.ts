import {
  type IAltCoreButtonGroupExternalProps,
  createCoreButtonGroupExternalProps,
} from './external'

export * from './external'

export interface IAltCoreButtonGroupProps extends IAltCoreButtonGroupExternalProps {}

export const createCoreButtonGroupProps = (): IAltCoreButtonGroupProps => {
  return { ...createCoreButtonGroupExternalProps() }
}
