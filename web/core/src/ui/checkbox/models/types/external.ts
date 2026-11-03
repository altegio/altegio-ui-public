import { createCoreLabelExternalProps, type IAltCoreLabelExternalProps } from '~core/ui/label/models/types'
import { createCoreAnnotationExternalProps, type IAltCoreAnnotationExternalProps } from '~core/ui/annotation/models/types'
import { createCoreErrorExternalProps, type IAltCoreErrorExternalProps } from '~core/ui/error/models/types'
import { createCoreSimpleCheckboxExternalProps, type IAltCoreSimpleCheckboxExternalProps } from '~core/ui/simpleCheckbox/models/types'


export interface IAltCoreCheckboxExternalProps extends Omit<IAltCoreSimpleCheckboxExternalProps, 'error'>,
  Omit<IAltCoreLabelExternalProps, 'text' | 'tooltipText' | 'disabled' | 'debounce' | 'tooltipPlacement'>,
  Omit<IAltCoreAnnotationExternalProps, 'text' | 'disabled'>,
  IAltCoreErrorExternalProps {
  labelText: IAltCoreLabelExternalProps['text']
  labelTooltipText: IAltCoreLabelExternalProps['tooltipText']
  labelOverflowDebounce: IAltCoreLabelExternalProps['debounce']
  annotationText: IAltCoreAnnotationExternalProps['text']
  labelTooltipPlacement: IAltCoreLabelExternalProps['tooltipPlacement']

  /** Name under which the checkbox submits its value with a form; also opts it into form validation and reset */
  name: string | undefined

  /** Value submitted with the form while the checkbox is checked, `on` by default */
  value: string | undefined
}

export const createCoreCheckboxExternalProps = (): IAltCoreCheckboxExternalProps => {
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
    name: undefined,
    value: undefined,
    ...coreLabelProps,
    ...coreAnnotationProps,
    ...createCoreSimpleCheckboxExternalProps(),
    ...createCoreErrorExternalProps(),
  }
}

