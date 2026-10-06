import { type TAnchorTarget } from '~shared/types/global'

export interface IYCoreLinkExternalProps {
  href: string | undefined
  target: TAnchorTarget | undefined
  textWrap: boolean | undefined
}

export const createCoreLinkExternalProps = (): IYCoreLinkExternalProps => {
  return {
    href: undefined,
    target: undefined,
    textWrap: undefined,
  }
}
