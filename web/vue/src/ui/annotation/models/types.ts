import {
  createCoreAnnotationExternalProps,
  type IAltCoreAnnotationExternalProps,
} from '~core/ui/annotation/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreAnnotationProps extends IAltCoreAnnotationExternalProps {}

export interface IAltVueAnnotationProps {
  text?: IAltVueCoreAnnotationProps['text']
  disabled?: IAltVueCoreAnnotationProps['disabled']
}

export const createVueAnnotationProps = (): TDefinedVueProps<IAltVueAnnotationProps> => {
  const { text, disabled } = createCoreAnnotationExternalProps()
  return {
    text,
    disabled,
  }
}
