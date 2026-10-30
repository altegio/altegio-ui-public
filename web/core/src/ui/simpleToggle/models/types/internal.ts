export interface IAltCoreSimpleToggleInternalProps {
  hovered: boolean | undefined
}

export const createCoreSimpleToggleInternalProps = (): IAltCoreSimpleToggleInternalProps => {
  return { hovered: false }
}

export const internalPropsKeys = Object.keys(createCoreSimpleToggleInternalProps()) as (keyof IAltCoreSimpleToggleInternalProps)[]
