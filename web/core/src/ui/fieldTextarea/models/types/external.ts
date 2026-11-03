import {
  createCoreFieldInputExternalProps,
  type IAltCoreFieldInputExternalProps,
} from '~core/ui/fieldInput/models/types'
import {
  EAltTextareaResize,
  type TAltTextareaResize,
} from '~shared/types/global'

export interface IAltCoreFieldTextareaExternalProps extends
  Omit<IAltCoreFieldInputExternalProps, 'type'> {
  rows: number | undefined
  resize: TAltTextareaResize | undefined
}

export const createCoreFieldTextareaExternalProps = (): IAltCoreFieldTextareaExternalProps => ({
  ...createCoreFieldInputExternalProps(),
  rows: 3,
  resize: EAltTextareaResize.NONE,
})
