import {
  createCoreAnnotationExternalProps,
  type IYCoreAnnotationExternalProps,
} from './external'

export * from './external'

export interface IYCoreAnnotationProps extends IYCoreAnnotationExternalProps {}

export const createCoreAnnotationProps = (): IYCoreAnnotationProps => {
  return { ...createCoreAnnotationExternalProps() }
}
