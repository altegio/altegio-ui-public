import {
  type IYCoreCollapseItemProps,
  EYCoreCollapseItemVariant,
} from '~core/ui/collapseItem/models/types'

export type TCollapseItemValueSingle = IYCoreCollapseItemProps['value']
export type TCollapseItemValueMultiple = TCollapseItemValueSingle[]

export enum EYCoreCollapseType {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
}

export type TYCoreCollapseType = `${EYCoreCollapseType}`

export interface IYCoreCollapseExternalProps {
  value: TCollapseItemValueSingle | TCollapseItemValueMultiple | undefined
  type: TYCoreCollapseType | undefined
  variant: IYCoreCollapseItemProps['variant']
  draggable: boolean
  allowCrossLevelMove: boolean
}

export const createCoreCollapseExternalProps = (): IYCoreCollapseExternalProps => ({
  type: EYCoreCollapseType.SINGLE,
  value: '',
  variant: EYCoreCollapseItemVariant.PRIMARY,
  draggable: false,
  allowCrossLevelMove: false,
})
