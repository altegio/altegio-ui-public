import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { empty, text } from '~shared/tests/slotContents'

export const href = 'https://example.com/'

export const booleanTestValues = [
  true,
  false,
]

export const booleanTestValuesWithUndefined = [
  ...booleanTestValues,
  undefined,
]

export const stringTestValues = [
  text,
  LOREM_IPSUM,
  empty,
]

