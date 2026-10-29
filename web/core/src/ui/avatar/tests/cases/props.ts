import type { TPropTestCase } from '~shared/types/tests'
import type { IYCoreAvatarExternalProps } from '~core/ui/avatar/models/types'
import { EYSizes } from '~shared/types/global'
import { ySearch } from '~shared/icons'
import { text } from '~shared/tests/slotContents'

const sizes = Object.values(EYSizes).filter((size) => size !== EYSizes.EXTRA_LARGE)

export const propDisabledTestCases: TPropTestCase<IYCoreAvatarExternalProps, 'disabled'>[] = [
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

export const propSizeTestCases: TPropTestCase<IYCoreAvatarExternalProps, 'size'>[] = sizes.map((size) => ({
  prop: 'size',
  case: size,
  value: size,
}))

export const propIconTestCases: TPropTestCase<IYCoreAvatarExternalProps, 'icon'>[] = [
  { prop: 'icon', case: 'with a value', value: ySearch },
  { prop: 'icon', case: 'without a value', value: undefined },
]

export const propInitialsTestCases: TPropTestCase<IYCoreAvatarExternalProps, 'initials'>[] = [
  { prop: 'initials', case: 'with a value', value: text, expected: 'initials' },
  { prop: 'initials', case: 'without a value', value: undefined, expected: 'initials' },
]

export const propPhotoTestCases: TPropTestCase<IYCoreAvatarExternalProps, 'photo'>[] = [
  { prop: 'photo', case: 'with a value', value: 'https://', expected: 'image' },
  { prop: 'photo', case: 'without a value', value: undefined, expected: 'image' },
]
