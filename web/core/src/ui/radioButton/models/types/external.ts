import { createCoreLabelExternalProps, type IAltCoreLabelExternalProps } from '~core/ui/label/models/types'
import { createCoreAnnotationExternalProps, type IAltCoreAnnotationExternalProps } from '~core/ui/annotation/models/types'
import { createCoreErrorExternalProps, type IAltCoreErrorExternalProps } from '~core/ui/error/models/types'
import { createCoreSimpleRadioButtonExternalProps, type IAltCoreSimpleRadioButtonExternalProps } from '~core/ui/simpleRadioButton/models/types'


export interface IAltCoreRadioButtonExternalProps extends Omit<IAltCoreSimpleRadioButtonExternalProps, 'error'>,
  Omit<IAltCoreLabelExternalProps, 'text' | 'tooltipText' | 'disabled' | 'debounce'>,
  Omit<IAltCoreAnnotationExternalProps, 'text' | 'disabled'>,
  IAltCoreErrorExternalProps {
  value: string | number | boolean | null | undefined
  labelText: IAltCoreLabelExternalProps['text']
  labelTooltipText: IAltCoreLabelExternalProps['tooltipText']
  labelOverflowDebounce: IAltCoreLabelExternalProps['debounce']
  annotationText: IAltCoreAnnotationExternalProps['text']
}

export const createCoreRadioButtonExternalProps = (): IAltCoreRadioButtonExternalProps => {
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
    value: undefined,
    labelText,
    labelTooltipText,
    labelOverflowDebounce,
    annotationText,
    ...coreLabelProps,
    ...coreAnnotationProps,
    ...createCoreSimpleRadioButtonExternalProps(),
    ...createCoreErrorExternalProps(),
  }
}

