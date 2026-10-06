import {
  createCoreLabelInternalProps,
  createCoreLabelExternalProps,
  type IYCoreLabelExternalProps,
  type IYCoreLabelInternalProps,
} from '~core/ui/label/models/types'

export interface IYNgLabelProps extends IYCoreLabelExternalProps, IYCoreLabelInternalProps {}

export const createNgLabelProps = (): IYNgLabelProps => {
  return { ...createCoreLabelExternalProps(), ...createCoreLabelInternalProps() }
}
