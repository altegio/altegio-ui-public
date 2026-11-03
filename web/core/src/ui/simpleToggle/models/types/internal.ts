export interface IAltCoreSimpleToggleInternalProps {
  hovered: boolean | undefined

  /** Accessible description, set by labelled wrappers such as AltCoreToggle */
  accessibleDescription: string | undefined
}

export const createCoreSimpleToggleInternalProps = (): IAltCoreSimpleToggleInternalProps => {
  return {
    hovered: false,
    accessibleDescription: undefined,
  }
}

export const internalPropsKeys = Object.keys(createCoreSimpleToggleInternalProps()) as (keyof IAltCoreSimpleToggleInternalProps)[]
