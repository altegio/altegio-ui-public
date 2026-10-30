import { altPlus, altChevronUp, altChevronDown } from '~shared/icons'
import { text, empty } from '~shared/tests/slotContents'
import { EAltSizes } from '~shared/types/global'
import type { IAltIcon } from '~shared/icons'
import type { TPropTestCase } from '~shared/types/tests'

import { propItemsTestCases as corePropItemsTestCases } from '~core/ui/dropdownList/tests/cases/props'

import { EAltCoreButtonDropdownIconTypes } from '../../models/types/internal'
import type { IAltCoreButtonDropdownProps } from '../../models/types'
import { EAltCoreSimpleButtonVariant } from '~web/core/src/ui/simpleButton/models/types'


interface IAltCoreQuakButtonDropdownPropTestCase extends TPropTestCase<IAltCoreButtonDropdownProps, 'iconType'> {
  additionalProps: {
    validIcons: IAltIcon[]
  }
}

export const propIconTestCases: IAltCoreQuakButtonDropdownPropTestCase[] = [
  {
    prop: 'iconType',
    case: 'left icon',
    value: EAltCoreButtonDropdownIconTypes.LEFT,
    additionalProps: { validIcons: [altPlus] },
  },
  {
    prop: 'iconType',
    case: 'right icon',
    value: EAltCoreButtonDropdownIconTypes.RIGHT,
    additionalProps: { validIcons: [altChevronUp, altChevronDown] },
  },
]

export const propItemsTestCases: TPropTestCase<IAltCoreButtonDropdownProps, 'items'>[] = [
  ...corePropItemsTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'items', case: 'without items', value: undefined, expected: [] },
]

export const propVariantTestCases: TPropTestCase<IAltCoreButtonDropdownProps, 'variant'>[] = [
  { prop: 'variant', case: 'primary', value: EAltCoreSimpleButtonVariant.PRIMARY, expected: EAltCoreSimpleButtonVariant.PRIMARY },
  { prop: 'variant', case: 'outline', value: EAltCoreSimpleButtonVariant.OUTLINE, expected: EAltCoreSimpleButtonVariant.OUTLINE },
  { prop: 'variant', case: 'outline-filled', value: EAltCoreSimpleButtonVariant.OUTLINE_FILLED, expected: EAltCoreSimpleButtonVariant.OUTLINE_FILLED },
  { prop: 'variant', case: 'text', value: EAltCoreSimpleButtonVariant.TEXT, expected: EAltCoreSimpleButtonVariant.TEXT },
  { prop: 'variant', case: 'undefined', value: undefined, expected: EAltCoreSimpleButtonVariant.PRIMARY },
]

export const propDisabledTestCases: TPropTestCase<IAltCoreButtonDropdownProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: false },
]

export const propSizeCases: TPropTestCase<IAltCoreButtonDropdownProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE, expected: EAltSizes.LARGE },
  { prop: 'size', case: 'undefined', value: undefined, expected: EAltSizes.SMALL },
]

export const propLoadingTestCases: TPropTestCase<IAltCoreButtonDropdownProps, 'loading'>[] = [
  { prop: 'loading', case: 'true', value: true, expected: true },
  { prop: 'loading', case: 'false', value: false, expected: false },
  { prop: 'loading', case: 'undefined', value: undefined, expected: false },
]

export const propLabelTestCases: TPropTestCase<IAltCoreButtonDropdownProps, 'label'>[] = [
  { prop: 'label', case: 'text', value: text, expected: text },
  { prop: 'label', case: 'empty', value: empty, expected: empty },
]

export const propFullWidthTestCases: TPropTestCase<IAltCoreButtonDropdownProps, 'fullWidth'>[] = [
  { prop: 'fullWidth', case: 'true', value: true, expected: true },
  { prop: 'fullWidth', case: 'false', value: false, expected: false },
]

export const propAutoCloseTestCases: TPropTestCase<IAltCoreButtonDropdownProps, 'autoClose'>[] = [
  { prop: 'autoClose', case: 'true', value: true, expected: true },
  { prop: 'autoClose', case: 'false', value: false, expected: false },
]
