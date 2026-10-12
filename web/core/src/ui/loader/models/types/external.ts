import { EYSizes, type TYSizes } from '~shared/types/global'

export type TYCoreLoaderSize = Extract<
  TYSizes, 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large'
>

export enum EYCoreLoaderVariant {
  BLACK = 'black',
  WHITE = 'white',
  YELLOW = 'yellow',
}

export type TYCoreLoaderVariant = `${EYCoreLoaderVariant}`

export interface IYCoreLoaderExternalProps {
  size: TYCoreLoaderSize | undefined
  variant: TYCoreLoaderVariant | undefined
}

export const createCoreLoaderExternalProps = (): IYCoreLoaderExternalProps => {
  return {
    size: EYSizes.SMALL,
    variant: EYCoreLoaderVariant.BLACK,
  }
}
