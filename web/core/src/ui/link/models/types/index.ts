import {
  createCoreLinkExternalProps,
  type IYCoreLinkExternalProps,
} from './external'

export * from './external'

export interface IYCoreLinkProps extends IYCoreLinkExternalProps {}

export const createCoreLinkProps = (): IYCoreLinkProps => ({ ...createCoreLinkExternalProps() })
