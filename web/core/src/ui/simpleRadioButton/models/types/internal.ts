export interface IAltCoreSimpleRadioButtonInternalProps {
  hovered: boolean | undefined

  /** Accessible description, set by labelled wrappers such as AltCoreRadioButton */
  accessibleDescription: string | undefined

  /** Whether Tab reaches the radio button; a radio group keeps only one of its radio buttons in the tab order */
  tabStop: boolean | undefined
}

export const createCoreSimpleRadioButtonInternalProps = (): IAltCoreSimpleRadioButtonInternalProps => {
  return {
    hovered: false,
    accessibleDescription: undefined,
    tabStop: true,
  }
}

export const internalPropsKeys = Object.keys(createCoreSimpleRadioButtonInternalProps()) as (keyof IAltCoreSimpleRadioButtonInternalProps)[]
