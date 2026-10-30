import type { Placement } from '@floating-ui/dom'
import { EAltCoreDropdownPlacement } from '~core/ui/dropdown/models/types'

export enum EAltCoreLabelAlignment {
  TOP = 'top',
  CENTER = 'center',
}

export type TAltCoreLabelAlignment = `${EAltCoreLabelAlignment}`

export interface IAltCoreLabelExternalProps {
  text: string | undefined
  tooltipText: string | undefined
  alignment: TAltCoreLabelAlignment | undefined
  disabled: boolean | undefined
  required: boolean | undefined
  debounce: number | undefined
  tooltipPlacement?: Placement
  locator?: string
}

export const createCoreLabelExternalProps = (): IAltCoreLabelExternalProps => {
  return { text: '', tooltipText: '', alignment: EAltCoreLabelAlignment.CENTER, disabled: false, required: false, debounce: 300, tooltipPlacement: EAltCoreDropdownPlacement.RIGHT }
}
