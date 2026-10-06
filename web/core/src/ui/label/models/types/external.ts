import type { Placement } from '@floating-ui/dom'
import { EYCoreDropdownPlacement } from '~core/ui/dropdown/models/types'

export enum EYCoreLabelAlignment {
  TOP = 'top',
  CENTER = 'center',
}

export type TYCoreLabelAlignment = `${EYCoreLabelAlignment}`

export interface IYCoreLabelExternalProps {
  text: string | undefined
  tooltipText: string | undefined
  alignment: TYCoreLabelAlignment | undefined
  disabled: boolean | undefined
  required: boolean | undefined
  debounce: number | undefined
  tooltipPlacement?: Placement
  locator?: string
}

export const createCoreLabelExternalProps = (): IYCoreLabelExternalProps => {
  return { text: '', tooltipText: '', alignment: EYCoreLabelAlignment.CENTER, disabled: false, required: false, debounce: 300, tooltipPlacement: EYCoreDropdownPlacement.RIGHT }
}
