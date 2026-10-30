import type { IAltCoreRadioButtonProps } from '~core/ui/radioButton/models/types'
import { addPrefixToObjectKeys, type TAddPrefixToObject } from '~shared/utils'
import { createCoreLabelExternalProps, type IAltCoreLabelExternalProps } from '~core/ui/label/models/types'
import { omit } from 'radash'

export enum EAltCoreRadioButtonGroupDirection {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export type TAltCoreRadioButtonGroupDirection = `${EAltCoreRadioButtonGroupDirection}`

export interface IAltCoreRadioButtonGroupExternalProps extends TAddPrefixToObject<Omit<IAltCoreLabelExternalProps, 'alignment' | 'disabled' | 'required'>, 'label'> {
  value: IAltCoreRadioButtonProps['value']
  size: IAltCoreRadioButtonProps['size'] | undefined
  alignment: IAltCoreRadioButtonProps['alignment'] | undefined
  direction: TAltCoreRadioButtonGroupDirection | undefined
  labelTooltipActive: boolean | undefined
}

export const createCoreRadioButtonGroupExternalProps =
  (): IAltCoreRadioButtonGroupExternalProps => ({
    ...addPrefixToObjectKeys(omit(createCoreLabelExternalProps(), ['alignment', 'disabled', 'required']), 'label'),
    value: '',
    size: 'small',
    alignment: 'center',
    direction: EAltCoreRadioButtonGroupDirection.VERTICAL,
    labelTooltipActive: true,
  })
