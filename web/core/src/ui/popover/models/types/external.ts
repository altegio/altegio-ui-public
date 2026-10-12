import {
  type IYCoreTipExternalProps,
  createCoreTipExternalProps,
} from '~core/ui/tip/models/types'

export interface IYCorePopoverExternalProps extends IYCoreTipExternalProps {
  submitText: string | undefined
  cancelText: string | undefined
  disabled: boolean
}

export const createCorePopoverExternalProps = (): IYCorePopoverExternalProps => ({
  ...createCoreTipExternalProps(),
  submitText: undefined,
  cancelText: undefined,
  disabled: false,
})
