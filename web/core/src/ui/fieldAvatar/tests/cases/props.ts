import type { TPropTestCase } from '~shared/types/tests'
import type { IYCoreFieldAvatarExternalProps } from '~core/ui/fieldAvatar/models/types'
import { mapSizeToAvatarSize } from '~core/ui/fieldAvatar/models/types'
import { EYSizes } from '~shared/types/global'
import { ySearch } from '~shared/icons'
import { text } from '~shared/tests/slotContents'

const sizes = Object.values(EYSizes).filter((size) => size !== EYSizes.EXTRA_LARGE && size !== EYSizes.EXTRA_SMALL)

export const propDisabledTestCases: TPropTestCase<IYCoreFieldAvatarExternalProps, 'disabled'>[] = [
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

export const propSizeTestCases: TPropTestCase<IYCoreFieldAvatarExternalProps, 'size'>[] = sizes.map((size) => ({
  prop: 'size',
  case: size,
  value: size,
  expected: mapSizeToAvatarSize[size],
}))

export const propIconTestCases: TPropTestCase<IYCoreFieldAvatarExternalProps, 'icon'>[] = [
  { prop: 'icon', case: 'со значением', value: ySearch, expected: ySearch },
  { prop: 'icon', case: 'без значения', value: undefined, expected: undefined },
]

export const propInitialsTestCases: TPropTestCase<IYCoreFieldAvatarExternalProps, 'initials'>[] = [
  { prop: 'initials', case: 'со значением', value: text, expected: text },
  { prop: 'initials', case: 'без значения', value: undefined, expected: undefined },
]

export const propPhotoTestCases: TPropTestCase<IYCoreFieldAvatarExternalProps, 'photo'>[] = [
  { prop: 'photo', case: 'со значением', value: 'https://', expected: 'https://' },
  { prop: 'photo', case: 'без значения', value: undefined, expected: undefined },
]
