export enum EAltCoreListItemAlign {
  CENTER = 'center',
  START = 'start',
}

export type TAltCoreListItemAlign = `${EAltCoreListItemAlign}`

export interface IAltCoreListItemExternalProps {
  label: string | undefined
  caption: string | undefined
  clickable: boolean | undefined
  href: string | undefined
  target: string | undefined
  disabled: boolean | undefined
  active: boolean | undefined
  align: TAltCoreListItemAlign | undefined
}

export const createCoreListItemExternalProps = (): IAltCoreListItemExternalProps => ({
  label: '',
  caption: '',
  clickable: false,
  href: undefined,
  target: undefined,
  disabled: false,
  active: false,
  align: EAltCoreListItemAlign.CENTER,
})
