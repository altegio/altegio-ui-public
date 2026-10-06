import { createCoreLabelExternalProps, type IYCoreLabelExternalProps } from '~core/ui/label/models/types'
import { createCoreAnnotationExternalProps, type IYCoreAnnotationExternalProps } from '~core/ui/annotation/models/types'
import { createCoreErrorExternalProps, type IYCoreErrorExternalProps } from '~core/ui/error/models/types'
import { createCoreSimpleCheckboxExternalProps, type IYCoreSimpleCheckboxExternalProps } from '~core/ui/simpleCheckbox/models/types'


export interface IYCoreCheckboxExternalProps extends Omit<IYCoreSimpleCheckboxExternalProps, 'error'>,
  Omit<IYCoreLabelExternalProps, 'text' | 'tooltipText' | 'disabled' | 'debounce' | 'tooltipPlacement'>,
  Omit<IYCoreAnnotationExternalProps, 'text' | 'disabled'>,
  IYCoreErrorExternalProps {
  labelText: IYCoreLabelExternalProps['text']
  labelTooltipText: IYCoreLabelExternalProps['tooltipText']
  labelOverflowDebounce: IYCoreLabelExternalProps['debounce']
  annotationText: IYCoreAnnotationExternalProps['text']
  labelTooltipPlacement: IYCoreLabelExternalProps['tooltipPlacement']
}

export const createCoreCheckboxExternalProps = (): IYCoreCheckboxExternalProps => {
  const {
    text: labelText,
    tooltipText: labelTooltipText,
    debounce: labelOverflowDebounce,
    tooltipPlacement: labelTooltipPlacement,
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
    labelTooltipPlacement,
    ...coreLabelProps,
    ...coreAnnotationProps,
    ...createCoreSimpleCheckboxExternalProps(),
    ...createCoreErrorExternalProps(),
  }
}

