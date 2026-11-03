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

import type { IAltNgButtonDropdownProps } from '~ng/ui/buttonDropdown/models/types'

export const propItemsTestCases: TPropTestCase<IAltNgButtonDropdownProps, 'items'>[] = [...corePropItemsTestCases]
export const propVariantTestCases: TPropTestCase<IAltNgButtonDropdownProps, 'variant'>[] = [...corePropVariantTestCases]
export const propDisabledTestCases: TPropTestCase<IAltNgButtonDropdownProps, 'disabled'>[] = [...corePropDisabledTestCases]
export const propSizeCases: TPropTestCase<IAltNgButtonDropdownProps, 'size'>[] = [...corePropSizeCases]
export const propLoadingTestCases: TPropTestCase<IAltNgButtonDropdownProps, 'loading'>[] = [...corePropLoadingTestCases]
export const propLabelTestCases: TPropTestCase<IAltNgButtonDropdownProps, 'label'>[] = [...corePropLabelTestCases]
export const propFullWidthTestCases: TPropTestCase<IAltNgButtonDropdownProps, 'fullWidth'>[] = [...corePropFullWidthTestCases]
export const propAutoCloseTestCases: TPropTestCase<IAltNgButtonDropdownProps, 'autoClose'>[] = [...corePropAutoCloseTestCases]

