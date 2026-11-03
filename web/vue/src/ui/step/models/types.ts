import {
  createCoreStepExternalProps,
  type IAltCoreStepExternalProps,
} from '~core/ui/step/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueStepProps {
  name: NonNullable<IAltCoreStepExternalProps['name']>
  title: IAltCoreStepExternalProps['title']
  caption?: IAltCoreStepExternalProps['caption']
  done?: IAltCoreStepExternalProps['done']
  error?: IAltCoreStepExternalProps['error']
  disabled?: IAltCoreStepExternalProps['disabled']
}

export const createVueStepProps = (): TDefinedVueProps<IAltVueStepProps> => {
  const { caption, done, error, disabled } = createCoreStepExternalProps()

  return {
    caption,
    done,
    error,
    disabled,
  }
}
