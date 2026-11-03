import { type TPrimitive } from '~shared/types/global'

export enum EAltCoreCollapseItemVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  GHOST = 'ghost',
}

export type TCollapseItemVariant = `${EAltCoreCollapseItemVariant}`

export interface IAltCoreCollapseItemExternalProps {
  label: string | undefined
  annotation: string | undefined
  opened: boolean | undefined
  loading: boolean | undefined
  shallow: boolean | undefined
  value: NonNullable<TPrimitive> | undefined
  variant: TCollapseItemVariant | undefined
}

export const createCoreCollapseItemExternalProps = (): IAltCoreCollapseItemExternalProps => ({
  label: undefined,
  annotation: undefined,
  opened: false,
  loading: undefined,
  shallow: false,
  value: undefined,
  variant: EAltCoreCollapseItemVariant.PRIMARY,
})
