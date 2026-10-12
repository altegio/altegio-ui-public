import { createCoreTipProps, type IYCoreTipProps } from '~core/ui/tip/models/types'
import { type IYCoreDropdownExternalProps } from '~core/ui/dropdown/models/types'

export interface IYCoreTooltipProps {
  text: string | undefined
  disabled: IYCoreTipProps['disabled'] | undefined
  placement: IYCoreDropdownExternalProps['placement'] | undefined
  type: IYCoreTipProps['type'] | undefined
}

const { disabled, type, placement } = createCoreTipProps()

export const createCoreTooltipProps = (): IYCoreTooltipProps => {
  return { text: '', disabled, placement, type }
}
