import { createCoreAnnotationExternalProps, type IAltCoreAnnotationExternalProps } from '~core/ui/annotation/models/types'

export interface IAltNgAnnotationProps extends IAltCoreAnnotationExternalProps {}

export const createNgAnnotationProps = (): IAltNgAnnotationProps => createCoreAnnotationExternalProps()
