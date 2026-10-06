export enum EYCoreTextSize {
  H1_SEMIBOLD = 'h1-semibold',
  H2_SEMIBOLD = 'h2-semibold',
  H3_SEMIBOLD = 'h3-semibold',
  H4_SEMIBOLD = 'h4-semibold',
  P1_REGULAR = 'p1-regular',
  P1_MEDIUM = 'p1-medium',
  P2_REGULAR = 'p2-regular',
  P2_MEDIUM = 'p2-medium',
  S1_MEDIUM = 's1-medium',
  S1_SEMIBOLD = 's1-semibold',
  A1_REGULAR = 'a1-regular',
  A1_MEDIUM = 'a1-medium',
  A2_REGULAR = 'a2-regular',
  A2_MEDIUM = 'a2-medium',
  A3_MEDIUM = 'a3-medium',
  A4_MEDIUM = 'a4-medium',
}

export enum EYCoreTextVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  WARNING = 'warning',
  ACCENT = 'accent',
}

export type TYCoreTextSize = `${EYCoreTextSize}`
export type TYCoreTextVariant = `${EYCoreTextVariant}`

export interface IYCoreTextExternalProps {
  size: TYCoreTextSize | undefined
  variant: TYCoreTextVariant | undefined
  ellipsis: boolean | undefined
  lineclamp: number | undefined
  locator: string | undefined
}

export const createCoreTextExternalProps = (): IYCoreTextExternalProps => {
  return {
    size: EYCoreTextSize.P2_REGULAR,
    variant: EYCoreTextVariant.PRIMARY,
    ellipsis: false,
    lineclamp: 1,
    locator: undefined,
  }
}
