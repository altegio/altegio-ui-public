import {
  createCoreCardMainExternalProps,
  type IAltCoreCardMainExternalProps,
} from './external'

export * from './external'

export interface IAltCoreCardMainProps extends IAltCoreCardMainExternalProps {}

export const createCoreCardMainProps = (): IAltCoreCardMainProps => ({ ...createCoreCardMainExternalProps() })
