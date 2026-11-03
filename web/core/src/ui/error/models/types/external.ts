export interface IAltCoreErrorExternalProps {
  errors: string[] | undefined
  locator?: string
}

export const createCoreErrorExternalProps = (): IAltCoreErrorExternalProps => {
  return { errors: undefined }
}
