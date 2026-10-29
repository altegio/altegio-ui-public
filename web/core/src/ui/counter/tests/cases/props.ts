import { EYCoreCounterVariant } from './../../models/types/external'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IYCoreCounterProps } from '../../models/types'
import { empty, text } from '~shared/tests/slotContents.ts'

const getExpectedValue = (value: number): string => {
  return value > 999 ? '999+' : String(Math.trunc(value))
}

export const propSizeTestCases: TPropTestCase<IYCoreCounterProps, 'size'>[] = [
  EYSizes.SMALL as IYCoreCounterProps['size'],
  EYSizes.MEDIUM as IYCoreCounterProps['size'],
].map((value) => ({ prop: 'size', case: `with value ${value}`, value }))

export const propVariantTestCases: TPropTestCase<IYCoreCounterProps, 'variant'>[] = Object.values(EYCoreCounterVariant).map((variant) => ({
  prop: 'variant',
  case: `with value ${variant}`,
  value: variant,
}))

export const propDisabledTestCases: TPropTestCase<IYCoreCounterProps, 'disabled'>[] = [{ prop: 'disabled', case: 'with value true', value: true }]

export const positiveValueTestCases: TPropTestCase<IYCoreCounterProps, 'value'>[] = [
  0,
  1.99,
  9,
  99,
  999,
].map((value) => ({ prop: 'value', case: `with value ${value}`, expected: getExpectedValue(value), value }))

export const negativeValueTestCases: TPropTestCase<IYCoreCounterProps, 'value'>[] = [
  -0,
  -9,
  -99,
  -999,
  -9999.99,
].map((value) => ({ prop: 'value', case: `with value ${value}`, expected: '0', value }))

export const overflowedValueTestCases: TPropTestCase<IYCoreCounterProps, 'value'>[] = [
  999.1,
  1000,
  9999,
].map((value) => ({ prop: 'value', case: `with value ${value}`, expected: getExpectedValue(value), value }))

export const propLocatorTestCases: TPropTestCase<IYCoreCounterProps, 'locator'>[] = [
  { prop: 'locator', case: 'text', value: text, expected: text },
  { prop: 'locator', case: 'empty string', value: empty, expected: empty },
  { prop: 'locator', case: 'undefined', value: undefined, expected: undefined },
]
