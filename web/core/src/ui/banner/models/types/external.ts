import type { IAltIcon } from '~shared/icons'

export enum EAltCoreBannerVariant {
  INFORMATION = 'information',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
  DISCOVERY = 'discovery',
  ACCENT = 'accent',
  MUTED = 'muted',
  INVERT = 'invert',
}

export type TAltCoreBannerVariant = `${EAltCoreBannerVariant}`

export enum EAltCoreBannerLayout {
  INLINE = 'inline',
  PAGE = 'page',
}

export type TAltCoreBannerLayout = `${EAltCoreBannerLayout}`

export interface IAltCoreBannerExternalProps {
  variant: TAltCoreBannerVariant | undefined
  layout: TAltCoreBannerLayout | undefined
  title: string
  description: string
  icon: IAltIcon | undefined
  hideIcon: boolean | undefined
  closable: boolean | undefined
  closeLabel: string | undefined
}

export const createCoreBannerExternalProps = (): IAltCoreBannerExternalProps => ({
  variant: EAltCoreBannerVariant.INFORMATION,
  layout: EAltCoreBannerLayout.INLINE,
  title: '',
  description: '',
  icon: undefined,
  hideIcon: false,
  closable: false,
  closeLabel: 'Close',
})
