export interface IAltCoreSimpleRadioButtonInternalProps {
  hovered: boolean | undefined
}

export const createCoreSimpleRadioButtonInternalProps = (): IAltCoreSimpleRadioButtonInternalProps => {
  return { hovered: false }
}

export const internalPropsKeys = Object.keys(createCoreSimpleRadioButtonInternalProps()) as (keyof IAltCoreSimpleRadioButtonInternalProps)[]
