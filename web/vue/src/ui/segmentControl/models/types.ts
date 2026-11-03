import type { TDefinedVueProps } from '~vue/utils/utility-types'

import type { ClickEvent, IAltCoreSegmentControlProps } from '~core/ui/segmentControl/models/types'
import { createCoreSegmentControlProps } from '~core/ui/segmentControl/models/types'

export interface IAltVueCoreSegmentControlProps extends IAltCoreSegmentControlProps {}

export interface IAltVueSegmentControlProps {
  options?: IAltVueCoreSegmentControlProps['options']
  size?: IAltVueCoreSegmentControlProps['size']
  manual?: IAltVueCoreSegmentControlProps['manual']
  modelValue?: IAltVueCoreSegmentControlProps['value']
  accessibleName?: IAltVueCoreSegmentControlProps['accessibleName']
}

export const createVueSegmentControlProps = (): TDefinedVueProps<IAltVueSegmentControlProps> => {
  const { options, size, manual, value, accessibleName } = createCoreSegmentControlProps()
  return {
    options: options ? () => options : undefined,
    size,
    manual,
    modelValue: value,
    accessibleName,
  }
}

export { ClickEvent } from '~core/ui/segmentControl/models/types'
export interface IAltVueSegmentControlEmits {
  (event: 'click' | 'update:modelValue', payload: ClickEvent['detail']['value']): void
}
