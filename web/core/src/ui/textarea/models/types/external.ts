import { omit, pick } from 'radash'
import {
  createCoreTextFieldExternalProps,
  type IAltCoreTextFieldExternalProps,
} from '~core/ui/textField/models/types'
import {
  createCoreFieldTextareaExternalProps,
  type IAltCoreFieldTextareaExternalProps,
} from '~core/ui/fieldTextarea/models/types'

export interface IAltCoreTextareaExternalProps extends
  Omit<IAltCoreTextFieldExternalProps, 'type' | 'maskOptions' | 'annotationText'>,
  Omit<IAltCoreTextFieldExternalProps, 'type' | 'maskOptions' | 'annotationText'>,
  Pick<IAltCoreFieldTextareaExternalProps, 'rows' | 'resize'> {
}

export const createCoreTextareaExternalProps = (): IAltCoreTextareaExternalProps => ({
  ...omit(createCoreTextFieldExternalProps(), ['type', 'maskOptions', 'annotationText']),
  ...pick(createCoreFieldTextareaExternalProps(), ['rows', 'resize']),
})
