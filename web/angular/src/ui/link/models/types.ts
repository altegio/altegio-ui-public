import { createCoreLinkExternalProps, type IYCoreLinkExternalProps } from '~core/ui/link/models/types'

export interface IYNgLinkProps extends IYCoreLinkExternalProps {}

export const createNgLinkProps = (): IYNgLinkProps => createCoreLinkExternalProps()
