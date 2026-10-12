import type { IYCoreRadioButtonProps } from '~core/ui/radioButton/models/types'
import { addPrefixToObjectKeys, type TAddPrefixToObject } from '~shared/utils'
import { createCoreLabelExternalProps, type IYCoreLabelExternalProps } from '~core/ui/label/models/types'
import { omit } from 'radash'

export enum EYCoreRadioButtonGroupDirection {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export type TYCoreRadioButtonGroupDirection = `${EYCoreRadioButtonGroupDirection}`

export interface IYCoreRadioButtonGroupExternalProps extends TAddPrefixToObject<Omit<IYCoreLabelExternalProps, 'alignment' | 'disabled' | 'required'>, 'label'> {
  value: IYCoreRadioButtonProps['value']
  size: IYCoreRadioButtonProps['size'] | undefined
  alignment: IYCoreRadioButtonProps['alignment'] | undefined
  direction: TYCoreRadioButtonGroupDirection | undefined
  labelTooltipActive: boolean | undefined
}

export const createCoreRadioButtonGroupExternalProps =
  (): IYCoreRadioButtonGroupExternalProps => ({
    ...addPrefixToObjectKeys(omit(createCoreLabelExternalProps(), ['alignment', 'disabled', 'required']), 'label'),
    value: '',
    size: 'small',
    alignment: 'center',
    direction: EYCoreRadioButtonGroupDirection.VERTICAL,
    labelTooltipActive: true,
  })
