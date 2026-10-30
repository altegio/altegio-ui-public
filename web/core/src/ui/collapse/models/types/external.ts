import {
  type IAltCoreCollapseItemProps,
  EAltCoreCollapseItemVariant,
} from '~core/ui/collapseItem/models/types'

export type TCollapseItemValueSingle = IAltCoreCollapseItemProps['value']
export type TCollapseItemValueMultiple = TCollapseItemValueSingle[]

export enum EAltCoreCollapseType {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
}

export type TAltCoreCollapseType = `${EAltCoreCollapseType}`

export interface IAltCoreCollapseExternalProps {
  value: TCollapseItemValueSingle | TCollapseItemValueMultiple | undefined
  type: TAltCoreCollapseType | undefined
  variant: IAltCoreCollapseItemProps['variant']
  draggable: boolean
  allowCrossLevelMove: boolean
}

export const createCoreCollapseExternalProps = (): IAltCoreCollapseExternalProps => ({
  type: EAltCoreCollapseType.SINGLE,
  value: '',
  variant: EAltCoreCollapseItemVariant.PRIMARY,
  draggable: false,
  allowCrossLevelMove: false,
})
