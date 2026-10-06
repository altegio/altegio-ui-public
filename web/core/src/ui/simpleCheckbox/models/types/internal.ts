export interface IYCoreSimpleCheckboxInternalProps {
  hovered: boolean | undefined
}

export const createCoreSimpleCheckboxInternalProps = (): IYCoreSimpleCheckboxInternalProps => {
  return { hovered: false }
}

export const internalPropsKeys = Object.keys(createCoreSimpleCheckboxInternalProps()) as (keyof IYCoreSimpleCheckboxInternalProps)[]
