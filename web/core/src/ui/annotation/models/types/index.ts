import {
  createCoreAnnotationExternalProps,
  type IAltCoreAnnotationExternalProps,
} from './external'

export * from './external'

export interface IAltCoreAnnotationProps extends IAltCoreAnnotationExternalProps {}

export const createCoreAnnotationProps = (): IAltCoreAnnotationProps => {
  return { ...createCoreAnnotationExternalProps() }
}
