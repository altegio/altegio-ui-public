export interface IAltCoreSimpleCheckboxInternalProps {
  hovered: boolean | undefined
}

export const createCoreSimpleCheckboxInternalProps = (): IAltCoreSimpleCheckboxInternalProps => {
  return { hovered: false }
}

export const internalPropsKeys = Object.keys(createCoreSimpleCheckboxInternalProps()) as (keyof IAltCoreSimpleCheckboxInternalProps)[]
