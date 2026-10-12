import {
  createCoreFieldInputExternalProps,
  type IYCoreFieldInputExternalProps,
} from '~core/ui/fieldInput/models/types'
import {
  EYTextareaResize,
  type TYTextareaResize,
} from '~shared/types/global'

export interface IYCoreFieldTextareaExternalProps extends
  Omit<IYCoreFieldInputExternalProps, 'type'> {
  rows: number | undefined
  resize: TYTextareaResize | undefined
}

export const createCoreFieldTextareaExternalProps = (): IYCoreFieldTextareaExternalProps => ({
  ...createCoreFieldInputExternalProps(),
  rows: 3,
  resize: EYTextareaResize.NONE,
})
