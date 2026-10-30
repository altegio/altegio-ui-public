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

import type { IAltVueButtonDropdownProps } from '~vue/ui/buttonDropdown/models/types'

export const propItemsTestCases: TPropTestCase<IAltVueButtonDropdownProps, 'items'>[] = [...corePropItemsTestCases]
export const propVariantTestCases: TPropTestCase<IAltVueButtonDropdownProps, 'variant'>[] = [...corePropVariantTestCases]
export const propDisabledTestCases: TPropTestCase<IAltVueButtonDropdownProps, 'disabled'>[] = [...corePropDisabledTestCases]
export const propSizeCases: TPropTestCase<IAltVueButtonDropdownProps, 'size'>[] = [...corePropSizeCases]
export const propLoadingTestCases: TPropTestCase<IAltVueButtonDropdownProps, 'loading'>[] = [...corePropLoadingTestCases]
export const propLabelTestCases: TPropTestCase<IAltVueButtonDropdownProps, 'label'>[] = [...corePropLabelTestCases]
export const propFullWidthTestCases: TPropTestCase<IAltVueButtonDropdownProps, 'fullWidth'>[] = [...corePropFullWidthTestCases]
export const propAutoCloseTestCases: TPropTestCase<IAltVueButtonDropdownProps, 'autoClose'>[] = [...corePropAutoCloseTestCases]
