import { createCoreTipProps, type IAltCoreTipProps } from '~core/ui/tip/models/types'
import { type IAltCoreDropdownExternalProps } from '~core/ui/dropdown/models/types'

export interface IAltCoreTooltipProps {
  text: string | undefined
  disabled: IAltCoreTipProps['disabled'] | undefined
  placement: IAltCoreDropdownExternalProps['placement'] | undefined
  type: IAltCoreTipProps['type'] | undefined
}

const { disabled, type, placement } = createCoreTipProps()

export const createCoreTooltipProps = (): IAltCoreTooltipProps => {
  return { text: '', disabled, placement, type }
}
