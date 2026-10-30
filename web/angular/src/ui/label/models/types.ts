import {
  createCoreLabelInternalProps,
  createCoreLabelExternalProps,
  type IAltCoreLabelExternalProps,
  type IAltCoreLabelInternalProps,
} from '~core/ui/label/models/types'

export interface IAltNgLabelProps extends IAltCoreLabelExternalProps, IAltCoreLabelInternalProps {}

export const createNgLabelProps = (): IAltNgLabelProps => {
  return { ...createCoreLabelExternalProps(), ...createCoreLabelInternalProps() }
}
