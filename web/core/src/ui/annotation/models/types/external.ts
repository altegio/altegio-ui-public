export interface IYCoreAnnotationExternalProps {
  text: string | undefined
  disabled: boolean | undefined
}

export const createCoreAnnotationExternalProps = (): IYCoreAnnotationExternalProps => {
  return {
    text: '',
    disabled: false,
  }
}
