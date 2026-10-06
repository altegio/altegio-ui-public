export interface IYCoreErrorExternalProps {
  errors: string[] | undefined
  locator?: string
}

export const createCoreErrorExternalProps = (): IYCoreErrorExternalProps => {
  return { errors: undefined }
}
