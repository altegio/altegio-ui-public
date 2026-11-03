import {
  createCoreRatingProps,
  type IAltCoreRatingProps,
} from '~core/ui/rating/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueRatingProps {
  modelValue?: IAltCoreRatingProps['value']
  max?: IAltCoreRatingProps['max']
  name?: string
  readonly?: IAltCoreRatingProps['readonly']
  disabled?: IAltCoreRatingProps['disabled']
  required?: IAltCoreRatingProps['required']
  size?: IAltCoreRatingProps['size']
  accessibleName?: IAltCoreRatingProps['accessibleName']
}

export interface IAltVueRatingEmits {
  (event: 'update:modelValue', value: number): void
}

export const createVueRatingProps = (): TDefinedVueProps<IAltVueRatingProps> => {
  const { value, max, readonly, disabled, required, size, accessibleName } = createCoreRatingProps()

  return {
    modelValue: value,
    max,
    name: undefined,
    readonly,
    disabled,
    required,
    size,
    accessibleName,
  }
}
