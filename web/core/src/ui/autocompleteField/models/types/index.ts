import {
  createCoreAutocompleteFieldExternalProps,
  type IAltCoreAutocompleteFieldExternalProps,
} from './external'


export * from './external'
export * from './events'

export interface IAltCoreAutocompleteFieldProps extends IAltCoreAutocompleteFieldExternalProps {}

export const createCoreAutocompleteFieldProps = (): IAltCoreAutocompleteFieldProps => ({ ...createCoreAutocompleteFieldExternalProps() })
