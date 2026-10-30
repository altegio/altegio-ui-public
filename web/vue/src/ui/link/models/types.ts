import {
  createCoreLinkExternalProps,
  type IAltCoreLinkExternalProps,
} from '~core/ui/link/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreLinkProps extends IAltCoreLinkExternalProps {}

export interface IAltVueLinkProps {
  target?: IAltVueCoreLinkProps['target']
  href?: IAltVueCoreLinkProps['href']
  textWrap?: IAltVueCoreLinkProps['textWrap']
}

export const createVueLinkProps = (): TDefinedVueProps<IAltVueLinkProps> => {
  const { href, target, textWrap } = createCoreLinkExternalProps()

  return {
    href: href ? () => href : undefined,
    target: target ? () => target : undefined,
    textWrap: textWrap ? () => textWrap : undefined,
  }
}
