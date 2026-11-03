import type { TAltSizes } from '~shared/types/global'

export type TAltCoreSkeletonSize = Extract<TAltSizes, 'small' | 'medium' | 'large'>

export enum EAltCoreSkeletonShape {
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle',
}

export type TAltCoreSkeletonShape = `${EAltCoreSkeletonShape}`

export interface IAltCoreSkeletonExternalProps {
  size: TAltCoreSkeletonSize | undefined
  shape: TAltCoreSkeletonShape | undefined
  width: string | number | undefined
  height: string | number | undefined
}

export const createCoreSkeletonExternalProps = (): IAltCoreSkeletonExternalProps => ({
  size: undefined,
  shape: EAltCoreSkeletonShape.RECTANGLE,
  width: undefined,
  height: undefined,
})
