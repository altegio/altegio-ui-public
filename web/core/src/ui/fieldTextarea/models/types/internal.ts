export interface IAltCoreFieldTextareaInternalProps {

  /** Accessible name of the textarea, usually the field label: the label renders in another shadow root */
  accessibleName: string | undefined

  /** Accessible description of the textarea, such as the errors */
  accessibleDescription: string | undefined

  /** Whether the field shows errors */
  accessibleInvalid: boolean | undefined
}

export const createCoreFieldTextareaInternalProps = (): IAltCoreFieldTextareaInternalProps => ({
  accessibleName: undefined,
  accessibleDescription: undefined,
  accessibleInvalid: undefined,
})
