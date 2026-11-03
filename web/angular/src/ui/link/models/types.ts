import { createCoreLinkExternalProps, type IAltCoreLinkExternalProps } from '~core/ui/link/models/types'

export interface IAltNgLinkProps extends IAltCoreLinkExternalProps {}

export const createNgLinkProps = (): IAltNgLinkProps => createCoreLinkExternalProps()
