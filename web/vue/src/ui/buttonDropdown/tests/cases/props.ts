import type { TPropTestCase } from '~shared/types/tests'

import {
  propItemsTestCases as corePropItemsTestCases,
  propVariantTestCases as corePropVariantTestCases,
  propDisabledTestCases as corePropDisabledTestCases,
  propSizeCases as corePropSizeCases,
  propLoadingTestCases as corePropLoadingTestCases,
  propLabelTestCases as corePropLabelTestCases,
  propFullWidthTestCases as corePropFullWidthTestCases,
  propAutoCloseTestCases as corePropAutoCloseTestCases,
} from '~core/ui/buttonDropdown/tests/cases/props'

import type { IYVueButtonDropdownProps } from '~vue/ui/buttonDropdown/models/types'

export const propItemsTestCases: TPropTestCase<IYVueButtonDropdownProps, 'items'>[] = [...corePropItemsTestCases]
export const propVariantTestCases: TPropTestCase<IYVueButtonDropdownProps, 'variant'>[] = [...corePropVariantTestCases]
export const propDisabledTestCases: TPropTestCase<IYVueButtonDropdownProps, 'disabled'>[] = [...corePropDisabledTestCases]
export const propSizeCases: TPropTestCase<IYVueButtonDropdownProps, 'size'>[] = [...corePropSizeCases]
export const propLoadingTestCases: TPropTestCase<IYVueButtonDropdownProps, 'loading'>[] = [...corePropLoadingTestCases]
export const propLabelTestCases: TPropTestCase<IYVueButtonDropdownProps, 'label'>[] = [...corePropLabelTestCases]
export const propFullWidthTestCases: TPropTestCase<IYVueButtonDropdownProps, 'fullWidth'>[] = [...corePropFullWidthTestCases]
export const propAutoCloseTestCases: TPropTestCase<IYVueButtonDropdownProps, 'autoClose'>[] = [...corePropAutoCloseTestCases]
