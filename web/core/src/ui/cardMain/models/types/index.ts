import {
  createCoreCardMainExternalProps,
  type IYCoreCardMainExternalProps,
} from './external'

export * from './external'

export interface IYCoreCardMainProps extends IYCoreCardMainExternalProps {}

export const createCoreCardMainProps = (): IYCoreCardMainProps => ({ ...createCoreCardMainExternalProps() })
