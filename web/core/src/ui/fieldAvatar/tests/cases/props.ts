import type { TPropTestCase } from '~shared/types/tests'
import type { IAltCoreFieldAvatarExternalProps } from '~core/ui/fieldAvatar/models/types'
import { mapSizeToAvatarSize } from '~core/ui/fieldAvatar/models/types'
import { EAltSizes } from '~shared/types/global'
import { altSearch } from '~shared/icons'
import { text } from '~shared/tests/slotContents'

const sizes = Object.values(EAltSizes).filter((size) => size !== EAltSizes.EXTRA_LARGE && size !== EAltSizes.EXTRA_SMALL)

export const propDisabledTestCases: TPropTestCase<IAltCoreFieldAvatarExternalProps, 'disabled'>[] = [
  {
    prop: 'disabled',
    case: 'true',
    value: true,
    expected: true,
  },
  {
    prop: 'disabled',
    case: 'false',
    value: false,
    expected: false,
  },
]

export const propSizeTestCases: TPropTestCase<IAltCoreFieldAvatarExternalProps, 'size'>[] = sizes.map((size) => ({
  prop: 'size',
  case: size,
  value: size,
  expected: mapSizeToAvatarSize[size],
}))

export const propIconTestCases: TPropTestCase<IAltCoreFieldAvatarExternalProps, 'icon'>[] = [
  { prop: 'icon', case: 'with a value', value: altSearch, expected: altSearch },
  { prop: 'icon', case: 'without a value', value: undefined, expected: undefined },
]

export const propInitialsTestCases: TPropTestCase<IAltCoreFieldAvatarExternalProps, 'initials'>[] = [
  { prop: 'initials', case: 'with a value', value: text, expected: text },
  { prop: 'initials', case: 'without a value', value: undefined, expected: undefined },
]

export const propPhotoTestCases: TPropTestCase<IAltCoreFieldAvatarExternalProps, 'photo'>[] = [
  { prop: 'photo', case: 'with a value', value: 'https://', expected: 'https://' },
  { prop: 'photo', case: 'without a value', value: undefined, expected: undefined },
]
