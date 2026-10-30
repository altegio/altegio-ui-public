import { EAltSizes, type TAltSizes } from '~shared/types/global'

export type TAltCoreLoaderSize = Extract<
  TAltSizes, 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large'
>

export enum EAltCoreLoaderVariant {
  BLACK = 'black',
  WHITE = 'white',
  YELLOW = 'yellow',
}

export type TAltCoreLoaderVariant = `${EAltCoreLoaderVariant}`

export interface IAltCoreLoaderExternalProps {
  size: TAltCoreLoaderSize | undefined
  variant: TAltCoreLoaderVariant | undefined
}

export const createCoreLoaderExternalProps = (): IAltCoreLoaderExternalProps => {
  return {
    size: EAltSizes.SMALL,
    variant: EAltCoreLoaderVariant.BLACK,
  }
}
