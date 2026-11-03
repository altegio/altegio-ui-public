export interface IAltCoreAnnotationExternalProps {
  text: string | undefined
  disabled: boolean | undefined
}

export const createCoreAnnotationExternalProps = (): IAltCoreAnnotationExternalProps => {
  return {
    text: '',
    disabled: false,
  }
}
