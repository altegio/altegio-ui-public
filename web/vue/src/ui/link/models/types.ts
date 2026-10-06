import {
  createCoreLinkExternalProps,
  type IYCoreLinkExternalProps,
} from '~core/ui/link/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreLinkProps extends IYCoreLinkExternalProps {}

export interface IYVueLinkProps {
  target?: IYVueCoreLinkProps['target']
  href?: IYVueCoreLinkProps['href']
  textWrap?: IYVueCoreLinkProps['textWrap']
}

export const createVueLinkProps = (): TDefinedVueProps<IYVueLinkProps> => {
  const { href, target, textWrap } = createCoreLinkExternalProps()

  return {
    href: href ? () => href : undefined,
    target: target ? () => target : undefined,
    textWrap: textWrap ? () => textWrap : undefined,
  }
}
