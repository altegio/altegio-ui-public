import { type TAnchorTarget } from '~shared/types/global'

export interface IAltCoreLinkExternalProps {
  href: string | undefined
  target: TAnchorTarget | undefined
  textWrap: boolean | undefined
}

export const createCoreLinkExternalProps = (): IAltCoreLinkExternalProps => {
  return {
    href: undefined,
    target: undefined,
    textWrap: undefined,
  }
}
