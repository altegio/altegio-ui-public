import { omit, pick } from 'radash'
import {
  createCoreTextFieldExternalProps,
  type IYCoreTextFieldExternalProps,
} from '~core/ui/textField/models/types'
import {
  createCoreFieldTextareaExternalProps,
  type IYCoreFieldTextareaExternalProps,
} from '~core/ui/fieldTextarea/models/types'

export interface IYCoreTextareaExternalProps extends
  Omit<IYCoreTextFieldExternalProps, 'type' | 'maskOptions' | 'annotationText'>,
  Omit<IYCoreTextFieldExternalProps, 'type' | 'maskOptions' | 'annotationText'>,
  Pick<IYCoreFieldTextareaExternalProps, 'rows' | 'resize'> {
}

export const createCoreTextareaExternalProps = (): IYCoreTextareaExternalProps => ({
  ...omit(createCoreTextFieldExternalProps(), ['type', 'maskOptions', 'annotationText']),
  ...pick(createCoreFieldTextareaExternalProps(), ['rows', 'resize']),
})
