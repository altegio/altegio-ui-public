import { createCoreLabelExternalProps, type IYCoreLabelExternalProps } from '~core/ui/label/models/types'
import { createCoreAnnotationExternalProps, type IYCoreAnnotationExternalProps } from '~core/ui/annotation/models/types'
import { createCoreErrorExternalProps, type IYCoreErrorExternalProps } from '~core/ui/error/models/types'
import { createCoreSimpleRadioButtonExternalProps, type IYCoreSimpleRadioButtonExternalProps } from '~core/ui/simpleRadioButton/models/types'


export interface IYCoreRadioButtonExternalProps extends Omit<IYCoreSimpleRadioButtonExternalProps, 'error'>,
  Omit<IYCoreLabelExternalProps, 'text' | 'tooltipText' | 'disabled' | 'debounce'>,
  Omit<IYCoreAnnotationExternalProps, 'text' | 'disabled'>,
  IYCoreErrorExternalProps {
  value: string | number | boolean | null | undefined
  labelText: IYCoreLabelExternalProps['text']
  labelTooltipText: IYCoreLabelExternalProps['tooltipText']
  labelOverflowDebounce: IYCoreLabelExternalProps['debounce']
  annotationText: IYCoreAnnotationExternalProps['text']
}

export const createCoreRadioButtonExternalProps = (): IYCoreRadioButtonExternalProps => {
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

