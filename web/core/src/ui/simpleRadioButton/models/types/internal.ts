export interface IYCoreSimpleRadioButtonInternalProps {
  hovered: boolean | undefined
}

export const createCoreSimpleRadioButtonInternalProps = (): IYCoreSimpleRadioButtonInternalProps => {
  return { hovered: false }
}

export const internalPropsKeys = Object.keys(createCoreSimpleRadioButtonInternalProps()) as (keyof IYCoreSimpleRadioButtonInternalProps)[]
