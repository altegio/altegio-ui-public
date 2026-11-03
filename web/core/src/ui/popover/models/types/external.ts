import {
  type IAltCoreTipExternalProps,
  createCoreTipExternalProps,
} from '~core/ui/tip/models/types'

export interface IAltCorePopoverExternalProps extends IAltCoreTipExternalProps {
  submitText: string | undefined
  cancelText: string | undefined
  disabled: boolean

  /** Accessible name of the dialog that a click popover opens */
  accessibleName: string | undefined
}

export const createCorePopoverExternalProps = (): IAltCorePopoverExternalProps => ({
  ...createCoreTipExternalProps(),
  submitText: undefined,
  cancelText: undefined,
  disabled: false,
  accessibleName: undefined,
})
