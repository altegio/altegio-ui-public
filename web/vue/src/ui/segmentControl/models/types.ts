import type { TDefinedVueProps } from '~vue/utils/utility-types'

import type { ClickEvent, IYCoreSegmentControlProps } from '~core/ui/segmentControl/models/types'
import { createCoreSegmentControlProps } from '~core/ui/segmentControl/models/types'

export interface IYVueCoreSegmentControlProps extends IYCoreSegmentControlProps {}

export interface IYVueSegmentControlProps {
  options?: IYVueCoreSegmentControlProps['options']
  size?: IYVueCoreSegmentControlProps['size']
  manual?: IYVueCoreSegmentControlProps['manual']
  modelValue?: IYVueCoreSegmentControlProps['value']
}

export const createVueSegmentControlProps = (): TDefinedVueProps<IYVueSegmentControlProps> => {
  const { options, size, manual, value } = createCoreSegmentControlProps()
  return {
    options: options ? () => options : undefined,
    size,
    manual,
    modelValue: value,
  }
}

export { ClickEvent } from '~core/ui/segmentControl/models/types'
export interface IYVueSegmentControlEmits {
  (event: 'click' | 'update:modelValue', payload: ClickEvent['detail']['value']): void
}
