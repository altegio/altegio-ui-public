export interface IAltCoreFormExternalProps {

  /** Leaves focus where it is when validation fails, instead of moving it to the first invalid field */
  noErrorFocus: boolean | undefined
}

export const createCoreFormExternalProps = (): IAltCoreFormExternalProps => ({ noErrorFocus: false })
