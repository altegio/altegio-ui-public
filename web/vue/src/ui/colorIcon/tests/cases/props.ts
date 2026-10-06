import type { TPropTestCase } from '~shared/types/tests'

import {
  propSizeCases as corePropSizeCases,
  propVariantCases as corePropVariantCases,
  propDisabledCases as corePropDisabledCases,
  requiredTestProps as coreRequiredTestProps,
} from '~core/ui/colorIcon/tests/cases/props'

import type { IYVueColorIconProps } from '~vue/ui/colorIcon/models/types'

export const requiredTestProps = { ...coreRequiredTestProps }

export const propSizeCases: TPropTestCase<IYVueColorIconProps, 'size'>[] = [...corePropSizeCases]
export const propVariantCases: TPropTestCase<IYVueColorIconProps, 'variant'>[] = [...corePropVariantCases]
export const propDisabledCases: TPropTestCase<IYVueColorIconProps, 'disabled'>[] = [...corePropDisabledCases]
