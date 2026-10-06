import { yPlus, yChevronUp, yChevronDown } from '~shared/icons'
import { text, empty } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'
import type { IYIcon } from '~shared/icons'
import type { TPropTestCase } from '~shared/types/tests'

import { propItemsTestCases as corePropItemsTestCases } from '~core/ui/dropdownList/tests/cases/props'

import { EYCoreButtonDropdownIconTypes } from '../../models/types/internal'
import type { IYCoreButtonDropdownProps } from '../../models/types'
import { EYCoreSimpleButtonVariant } from '~web/core/src/ui/simpleButton/models/types'


interface IYCoreQuakButtonDropdownPropTestCase extends TPropTestCase<IYCoreButtonDropdownProps, 'iconType'> {
  additionalProps: {
    validIcons: IYIcon[]
  }
}

export const propIconTestCases: IYCoreQuakButtonDropdownPropTestCase[] = [
  {
    prop: 'iconType',
    case: 'иконка слева',
    value: EYCoreButtonDropdownIconTypes.LEFT,
    additionalProps: { validIcons: [yPlus] },
  },
  {
    prop: 'iconType',
    case: 'иконка справа',
    value: EYCoreButtonDropdownIconTypes.RIGHT,
    additionalProps: { validIcons: [yChevronUp, yChevronDown] },
  },
]

export const propItemsTestCases: TPropTestCase<IYCoreButtonDropdownProps, 'items'>[] = [
  ...corePropItemsTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'items', case: 'без элементов', value: undefined, expected: [] },
]

export const propVariantTestCases: TPropTestCase<IYCoreButtonDropdownProps, 'variant'>[] = [
  { prop: 'variant', case: 'primary', value: EYCoreSimpleButtonVariant.PRIMARY, expected: EYCoreSimpleButtonVariant.PRIMARY },
  { prop: 'variant', case: 'outline', value: EYCoreSimpleButtonVariant.OUTLINE, expected: EYCoreSimpleButtonVariant.OUTLINE },
  { prop: 'variant', case: 'outline-filled', value: EYCoreSimpleButtonVariant.OUTLINE_FILLED, expected: EYCoreSimpleButtonVariant.OUTLINE_FILLED },
  { prop: 'variant', case: 'text', value: EYCoreSimpleButtonVariant.TEXT, expected: EYCoreSimpleButtonVariant.TEXT },
  { prop: 'variant', case: 'undefined', value: undefined, expected: EYCoreSimpleButtonVariant.PRIMARY },
]

export const propDisabledTestCases: TPropTestCase<IYCoreButtonDropdownProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: false },
]

export const propSizeCases: TPropTestCase<IYCoreButtonDropdownProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: 'medium', value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EYSizes.LARGE, expected: EYSizes.LARGE },
  { prop: 'size', case: 'undefined', value: undefined, expected: EYSizes.SMALL },
]

export const propLoadingTestCases: TPropTestCase<IYCoreButtonDropdownProps, 'loading'>[] = [
  { prop: 'loading', case: 'true', value: true, expected: true },
  { prop: 'loading', case: 'false', value: false, expected: false },
  { prop: 'loading', case: 'undefined', value: undefined, expected: false },
]

export const propLabelTestCases: TPropTestCase<IYCoreButtonDropdownProps, 'label'>[] = [
  { prop: 'label', case: 'text', value: text, expected: text },
  { prop: 'label', case: 'empty', value: empty, expected: empty },
]

export const propFullWidthTestCases: TPropTestCase<IYCoreButtonDropdownProps, 'fullWidth'>[] = [
  { prop: 'fullWidth', case: 'true', value: true, expected: true },
  { prop: 'fullWidth', case: 'false', value: false, expected: false },
]

export const propAutoCloseTestCases: TPropTestCase<IYCoreButtonDropdownProps, 'autoClose'>[] = [
  { prop: 'autoClose', case: 'true', value: true, expected: true },
  { prop: 'autoClose', case: 'false', value: false, expected: false },
]
