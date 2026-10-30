import type { TPropTestCase } from '~shared/types/tests'

import {
  propSizeCases as corePropSizeCases,
  propVariantCases as corePropVariantCases,
  propDisabledCases as corePropDisabledCases,
  requiredTestProps as coreRequiredTestProps,
} from '~core/ui/colorIcon/tests/cases/props'

import type { IAltVueColorIconProps } from '~vue/ui/colorIcon/models/types'

export const requiredTestProps = { ...coreRequiredTestProps }

export const propSizeCases: TPropTestCase<IAltVueColorIconProps, 'size'>[] = [...corePropSizeCases]
export const propVariantCases: TPropTestCase<IAltVueColorIconProps, 'variant'>[] = [...corePropVariantCases]
export const propDisabledCases: TPropTestCase<IAltVueColorIconProps, 'disabled'>[] = [...corePropDisabledCases]
