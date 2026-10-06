import {
  createCoreAutocompleteFieldExternalProps,
  type IYCoreAutocompleteFieldExternalProps,
} from './external'


export * from './external'
export * from './events'

export interface IYCoreAutocompleteFieldProps extends IYCoreAutocompleteFieldExternalProps {}

export const createCoreAutocompleteFieldProps = (): IYCoreAutocompleteFieldProps => ({ ...createCoreAutocompleteFieldExternalProps() })
