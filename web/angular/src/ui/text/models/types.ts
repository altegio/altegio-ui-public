import { createCoreTextExternalProps, type IAltCoreTextExternalProps } from '~core/ui/text/models/types'

export interface IAltNgTextProps extends IAltCoreTextExternalProps {}

export const createNgTextProps = (): IAltNgTextProps => createCoreTextExternalProps()

