export interface IAltCoreSimpleCheckboxInternalProps {
  hovered: boolean | undefined

  /** Accessible description, set by labelled wrappers such as AltCoreCheckbox */
  accessibleDescription: string | undefined

  /** Exposes aria-required, set by labelled wrappers such as AltCoreCheckbox */
  accessibleRequired: boolean | undefined
}

export const createCoreSimpleCheckboxInternalProps = (): IAltCoreSimpleCheckboxInternalProps => {
  return {
    hovered: false,
    accessibleDescription: undefined,
    accessibleRequired: false,
  }
}

export const internalPropsKeys = Object.keys(createCoreSimpleCheckboxInternalProps()) as (keyof IAltCoreSimpleCheckboxInternalProps)[]
