import { EAltCoreCounterVariant } from './../../models/types/external'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IAltCoreCounterProps } from '../../models/types'
import { empty, text } from '~shared/tests/slotContents.ts'

const getExpectedValue = (value: number): string => {
  return value > 999 ? '999+' : String(Math.trunc(value))
}

export const propSizeTestCases: TPropTestCase<IAltCoreCounterProps, 'size'>[] = [
  EAltSizes.SMALL as IAltCoreCounterProps['size'],
  EAltSizes.MEDIUM as IAltCoreCounterProps['size'],
].map((value) => ({ prop: 'size', case: `with value ${value}`, value }))

export const propVariantTestCases: TPropTestCase<IAltCoreCounterProps, 'variant'>[] = Object.values(EAltCoreCounterVariant).map((variant) => ({
  prop: 'variant',
  case: `with value ${variant}`,
  value: variant,
}))

export const propDisabledTestCases: TPropTestCase<IAltCoreCounterProps, 'disabled'>[] = [{ prop: 'disabled', case: 'with value true', value: true }]

export const positiveValueTestCases: TPropTestCase<IAltCoreCounterProps, 'value'>[] = [
  0,
  1.99,
  9,
  99,
  999,
].map((value) => ({ prop: 'value', case: `with value ${value}`, expected: getExpectedValue(value), value }))

export const negativeValueTestCases: TPropTestCase<IAltCoreCounterProps, 'value'>[] = [
  -0,
  -9,
  -99,
  -999,
  -9999.99,
].map((value) => ({ prop: 'value', case: `with value ${value}`, expected: '0', value }))

export const overflowedValueTestCases: TPropTestCase<IAltCoreCounterProps, 'value'>[] = [
  999.1,
  1000,
  9999,
].map((value) => ({ prop: 'value', case: `with value ${value}`, expected: getExpectedValue(value), value }))

export const propLocatorTestCases: TPropTestCase<IAltCoreCounterProps, 'locator'>[] = [
  { prop: 'locator', case: 'text', value: text, expected: text },
  { prop: 'locator', case: 'empty string', value: empty, expected: empty },
  { prop: 'locator', case: 'undefined', value: undefined, expected: undefined },
]
