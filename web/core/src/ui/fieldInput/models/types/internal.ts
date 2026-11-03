export interface IAltCoreFieldInputInternalProps {

  /** Accessible name of the input, usually the field label: the label renders in another shadow root */
  accessibleName: string | undefined

  /** Accessible description of the input, such as the errors and the annotation */
  accessibleDescription: string | undefined

  /** Whether the field shows errors */
  accessibleInvalid: boolean | undefined

  /** Role of the input, `combobox` for fields that open a list, `spinbutton` for fields that step a number */
  accessibleRole: 'combobox' | 'spinbutton' | undefined

  /** Whether the list a combobox opens is shown */
  accessibleExpanded: boolean | undefined

  /** Kind of popup a combobox opens, when it is not a listbox, such as the calendar dialog of a date picker */
  accessibleHasPopup: 'dialog' | undefined

  /** Whether typing filters the list of a combobox */
  accessibleAutocomplete: 'list' | 'none' | undefined

  /** List a combobox opens; referenced by element because it renders in another shadow root */
  accessibleControls: Element | undefined

  /** Option of the list that has visual focus while DOM focus stays in the input */
  accessibleActiveDescendant: Element | undefined

  /** Current number of a spinbutton */
  accessibleValueNow: number | undefined

  /** Smallest number of a spinbutton */
  accessibleValueMin: number | undefined

  /** Largest number of a spinbutton */
  accessibleValueMax: number | undefined
}

export const createCoreFieldInputInternalProps = (): IAltCoreFieldInputInternalProps => ({
  accessibleName: undefined,
  accessibleDescription: undefined,
  accessibleInvalid: undefined,
  accessibleRole: undefined,
  accessibleExpanded: undefined,
  accessibleHasPopup: undefined,
  accessibleAutocomplete: undefined,
  accessibleControls: undefined,
  accessibleActiveDescendant: undefined,
  accessibleValueNow: undefined,
  accessibleValueMin: undefined,
  accessibleValueMax: undefined,
})
