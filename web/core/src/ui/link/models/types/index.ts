import {
  createCoreLinkExternalProps,
  type IAltCoreLinkExternalProps,
} from './external'

export * from './external'

export interface IAltCoreLinkProps extends IAltCoreLinkExternalProps {}

export const createCoreLinkProps = (): IAltCoreLinkProps => ({ ...createCoreLinkExternalProps() })
