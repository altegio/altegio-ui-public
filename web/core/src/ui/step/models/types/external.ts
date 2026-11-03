export type TAltCoreStepName = string | number

export interface IAltCoreStepExternalProps {
  name: TAltCoreStepName | undefined
  title: string
  caption: string | undefined
  done: boolean | undefined
  error: boolean | undefined
  disabled: boolean | undefined
}

export const createCoreStepExternalProps = (): IAltCoreStepExternalProps => ({
  name: undefined,
  title: '',
  caption: undefined,
  done: false,
  error: false,
  disabled: false,
})
