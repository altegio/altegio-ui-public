import type { IShowErrorsStoryProps } from '../argTypes'

export const SINGLE_ERROR: IShowErrorsStoryProps['showErrors'] = ['Должен состоять из латинских букв, содержать хотя бы одну заглавную букву и число без использования пробелов']

export const MULTIPLE_ERRORS: IShowErrorsStoryProps['showErrors'] = [
  'Должен состоять из латинских букв',
  'Должен содержать хотя бы одну заглавную букву',
  'Должен содержать числа',
  'Не должен содержать символы или пробел',
]
