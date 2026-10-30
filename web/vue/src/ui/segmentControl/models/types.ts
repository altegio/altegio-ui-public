import type { TDefinedVueProps } from '~vue/utils/utility-types'

import type { ClickEvent, IAltCoreSegmentControlProps } from '~core/ui/segmentControl/models/types'
import { createCoreSegmentControlProps } from '~core/ui/segmentControl/models/types'

export interface IAltVueCoreSegmentControlProps extends IAltCoreSegmentControlProps {}

export interface IAltVueSegmentControlProps {
  options?: IAltVueCoreSegmentControlProps['options']
  size?: IAltVueCoreSegmentControlProps['size']
  manual?: IAltVueCoreSegmentControlProps['manual']
  modelValue?: IAltVueCoreSegmentControlProps['value']
}

export const createVueSegmentControlProps = (): TDefinedVueProps<IAltVueSegmentControlProps> => {
  const { options, size, manual, value } = createCoreSegmentControlProps()
  return {
    options: options ? () => options : undefined,
    size,
    manual,
    modelValue: value,
  }
}

export { ClickEvent } from '~core/ui/segmentControl/models/types'
export interface IAltVueSegmentControlEmits {
  (event: 'click' | 'update:modelValue', payload: ClickEvent['detail']['value']): void
}
