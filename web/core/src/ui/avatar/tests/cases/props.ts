import type { TPropTestCase } from '~shared/types/tests'
import type { IAltCoreAvatarExternalProps } from '~core/ui/avatar/models/types'
import { EAltSizes } from '~shared/types/global'
import { altSearch } from '~shared/icons'
import { text } from '~shared/tests/slotContents'

const sizes = Object.values(EAltSizes).filter((size) => size !== EAltSizes.EXTRA_LARGE)

export const propDisabledTestCases: TPropTestCase<IAltCoreAvatarExternalProps, 'disabled'>[] = [
  {
    prop: 'disabled',
    case: 'have',
    value: true,
  },
  {
    prop: 'disabled',
    case: 'not have',
    value: false,
  },
]

export const propSizeTestCases: TPropTestCase<IAltCoreAvatarExternalProps, 'size'>[] = sizes.map((size) => ({
  prop: 'size',
  case: size,
  value: size,
}))

export const propIconTestCases: TPropTestCase<IAltCoreAvatarExternalProps, 'icon'>[] = [
  { prop: 'icon', case: 'with a value', value: altSearch },
  { prop: 'icon', case: 'without a value', value: undefined },
]

export const propInitialsTestCases: TPropTestCase<IAltCoreAvatarExternalProps, 'initials'>[] = [
  { prop: 'initials', case: 'with a value', value: text, expected: 'initials' },
  { prop: 'initials', case: 'without a value', value: undefined, expected: 'initials' },
]

export const propPhotoTestCases: TPropTestCase<IAltCoreAvatarExternalProps, 'photo'>[] = [
  { prop: 'photo', case: 'with a value', value: 'https://', expected: 'image' },
  { prop: 'photo', case: 'without a value', value: undefined, expected: 'image' },
]
