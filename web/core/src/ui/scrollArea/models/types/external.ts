export enum EAltCoreScrollAreaOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  BOTH = 'both',
}

export type TAltCoreScrollAreaOrientation = `${EAltCoreScrollAreaOrientation}`

export type TAltCoreScrollAxis = 'vertical' | 'horizontal'

export interface IAltCoreScrollAreaExternalProps {
  orientation: TAltCoreScrollAreaOrientation | undefined
  accessibleName: string | undefined
}

export const createCoreScrollAreaExternalProps = (): IAltCoreScrollAreaExternalProps => ({
  orientation: EAltCoreScrollAreaOrientation.VERTICAL,
  accessibleName: undefined,
})
