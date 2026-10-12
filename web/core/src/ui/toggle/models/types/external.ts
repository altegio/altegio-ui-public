import { createCoreLabelExternalProps, type IYCoreLabelExternalProps } from '~core/ui/label/models/types'
import { createCoreAnnotationExternalProps, type IYCoreAnnotationExternalProps } from '~core/ui/annotation/models/types'
import { createCoreSimpleToggleExternalProps, type IYCoreSimpleToggleExternalProps } from '~core/ui/simpleToggle/models/types'

export interface IYCoreToggleExternalProps extends
  IYCoreSimpleToggleExternalProps,
  Omit<IYCoreLabelExternalProps, 'text' | 'tooltipText' | 'debounce' | 'required'>,
  Omit<IYCoreAnnotationExternalProps, 'text'> {
  labelText: IYCoreLabelExternalProps['text']
  labelTooltipText: IYCoreLabelExternalProps['tooltipText']
  labelOverflowDebounce: IYCoreLabelExternalProps['debounce']
  annotationText: IYCoreAnnotationExternalProps['text']
}

export const createCoreToggleExternalProps = (): IYCoreToggleExternalProps => {
  const {
    text: labelText,
    tooltipText: labelTooltipText,
    debounce: labelOverflowDebounce,
    ...coreLabelProps
  } = createCoreLabelExternalProps()

  const {
    text: annotationText,
    ...coreAnnotationProps
  } = createCoreAnnotationExternalProps()

  return {
    labelText,
    labelTooltipText,
    labelOverflowDebounce,
    annotationText,
    ...createCoreSimpleToggleExternalProps(),
    ...coreLabelProps,
    ...coreAnnotationProps,
  }
}
