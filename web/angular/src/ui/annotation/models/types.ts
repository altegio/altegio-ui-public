import { createCoreAnnotationExternalProps, type IYCoreAnnotationExternalProps } from '~core/ui/annotation/models/types'

export interface IYNgAnnotationProps extends IYCoreAnnotationExternalProps {}

export const createNgAnnotationProps = (): IYNgAnnotationProps => createCoreAnnotationExternalProps()
