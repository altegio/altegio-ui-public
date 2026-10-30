import { createCoreLabelExternalProps, type IAltCoreLabelExternalProps } from '~core/ui/label/models/types'
import { createCoreAnnotationExternalProps, type IAltCoreAnnotationExternalProps } from '~core/ui/annotation/models/types'
import { createCoreSimpleToggleExternalProps, type IAltCoreSimpleToggleExternalProps } from '~core/ui/simpleToggle/models/types'

export interface IAltCoreToggleExternalProps extends
  IAltCoreSimpleToggleExternalProps,
  Omit<IAltCoreLabelExternalProps, 'text' | 'tooltipText' | 'debounce' | 'required'>,
  Omit<IAltCoreAnnotationExternalProps, 'text'> {
  labelText: IAltCoreLabelExternalProps['text']
  labelTooltipText: IAltCoreLabelExternalProps['tooltipText']
  labelOverflowDebounce: IAltCoreLabelExternalProps['debounce']
  annotationText: IAltCoreAnnotationExternalProps['text']
}

export const createCoreToggleExternalProps = (): IAltCoreToggleExternalProps => {
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
