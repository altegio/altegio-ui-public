import { type TPrimitive } from '~shared/types/global'

export enum EYCoreCollapseItemVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  GHOST = 'ghost',
}

export type TCollapseItemVariant = `${EYCoreCollapseItemVariant}`

export interface IYCoreCollapseItemExternalProps {
  label: string | undefined
  annotation: string | undefined
  opened: boolean | undefined
  loading: boolean | undefined
  shallow: boolean | undefined
  value: NonNullable<TPrimitive> | undefined
  variant: TCollapseItemVariant | undefined
}

export const createCoreCollapseItemExternalProps = (): IYCoreCollapseItemExternalProps => ({
  label: undefined,
  annotation: undefined,
  opened: false,
  loading: undefined,
  shallow: false,
  value: undefined,
  variant: EYCoreCollapseItemVariant.PRIMARY,
})
