import {
  createCoreAnnotationExternalProps,
  type IYCoreAnnotationExternalProps,
} from '~core/ui/annotation/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreAnnotationProps extends IYCoreAnnotationExternalProps {}

export interface IYVueAnnotationProps {
  text?: IYVueCoreAnnotationProps['text']
  disabled?: IYVueCoreAnnotationProps['disabled']
}

export const createVueAnnotationProps = (): TDefinedVueProps<IYVueAnnotationProps> => {
  const { text, disabled } = createCoreAnnotationExternalProps()
  return {
    text,
    disabled,
  }
}
