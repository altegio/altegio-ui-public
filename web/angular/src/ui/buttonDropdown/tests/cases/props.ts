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

import type { IYNgButtonDropdownProps } from '~ng/ui/buttonDropdown/models/types'

export const propItemsTestCases: TPropTestCase<IYNgButtonDropdownProps, 'items'>[] = [...corePropItemsTestCases]
export const propVariantTestCases: TPropTestCase<IYNgButtonDropdownProps, 'variant'>[] = [...corePropVariantTestCases]
export const propDisabledTestCases: TPropTestCase<IYNgButtonDropdownProps, 'disabled'>[] = [...corePropDisabledTestCases]
export const propSizeCases: TPropTestCase<IYNgButtonDropdownProps, 'size'>[] = [...corePropSizeCases]
export const propLoadingTestCases: TPropTestCase<IYNgButtonDropdownProps, 'loading'>[] = [...corePropLoadingTestCases]
export const propLabelTestCases: TPropTestCase<IYNgButtonDropdownProps, 'label'>[] = [...corePropLabelTestCases]
export const propFullWidthTestCases: TPropTestCase<IYNgButtonDropdownProps, 'fullWidth'>[] = [...corePropFullWidthTestCases]
export const propAutoCloseTestCases: TPropTestCase<IYNgButtonDropdownProps, 'autoClose'>[] = [...corePropAutoCloseTestCases]

