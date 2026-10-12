import type { IShowErrorsStoryProps } from '../argTypes'

export const SINGLE_ERROR: IShowErrorsStoryProps['showErrors'] = ['Use Latin letters with at least one uppercase letter and one number, without spaces']

export const MULTIPLE_ERRORS: IShowErrorsStoryProps['showErrors'] = [
  'Use Latin letters',
  'Include at least one uppercase letter',
  'Include a number',
  'Do not include symbols or spaces',
]
