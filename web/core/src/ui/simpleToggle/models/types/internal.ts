export interface IYCoreSimpleToggleInternalProps {
  hovered: boolean | undefined
}

export const createCoreSimpleToggleInternalProps = (): IYCoreSimpleToggleInternalProps => {
  return { hovered: false }
}

export const internalPropsKeys = Object.keys(createCoreSimpleToggleInternalProps()) as (keyof IYCoreSimpleToggleInternalProps)[]
