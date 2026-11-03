import { createCoreLabelExternalProps, type IAltCoreLabelExternalProps } from '~core/ui/label/models/types'
import { createCoreAnnotationExternalProps, type IAltCoreAnnotationExternalProps } from '~core/ui/annotation/models/types'
import { createCoreSimpleToggleExternalProps, type IAltCoreSimpleToggleExternalProps } from '~core/ui/simpleToggle/models/types'
import { createCoreErrorExternalProps, type IAltCoreErrorExternalProps } from '~core/ui/error/models/types'

export interface IAltCoreToggleExternalProps extends
  IAltCoreSimpleToggleExternalProps,
  Omit<IAltCoreLabelExternalProps, 'text' | 'tooltipText' | 'debounce'>,
  Omit<IAltCoreAnnotationExternalProps, 'text'>,
  Pick<IAltCoreErrorExternalProps, 'errors'> {
  labelText: IAltCoreLabelExternalProps['text']
  labelTooltipText: IAltCoreLabelExternalProps['tooltipText']
  labelOverflowDebounce: IAltCoreLabelExternalProps['debounce']
  annotationText: IAltCoreAnnotationExternalProps['text']

  /** Name under which the switch submits its value with a form; also opts it into form validation and reset */
  name: string | undefined

  /** Value submitted with the form while the switch is on, `on` by default */
  value: string | undefined
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
    name: undefined,
    value: undefined,
    errors: createCoreErrorExternalProps().errors,
    ...createCoreSimpleToggleExternalProps(),
    ...coreLabelProps,
    ...coreAnnotationProps,
  }
}
