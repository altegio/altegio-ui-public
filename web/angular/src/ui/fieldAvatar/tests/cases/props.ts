import { text } from '~shared/tests/slotContents'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IAltNgFieldAvatarProps } from '~ng/ui/fieldAvatar/models/types'
import { createNgFieldAvatarProps } from '~ng/ui/fieldAvatar/models/types'
import { altSearch } from '~shared/icons'

const {
  disabled,
  size,
  initials,
  photo,
  icon,
} = createNgFieldAvatarProps()

export const propDisabledTestCases: TPropTestCase<IAltNgFieldAvatarProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]

export const propSizeTestCases: TPropTestCase<IAltNgFieldAvatarProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]

export const propInitialsTestCases: TPropTestCase<IAltNgFieldAvatarProps, 'initials'>[] = [
  { prop: 'initials', case: text, value: text, expected: text },
  { prop: 'initials', case: 'undefined', value: undefined, expected: initials },
]

export const propPhotoTestCases: TPropTestCase<IAltNgFieldAvatarProps, 'photo'>[] = [
  { prop: 'photo', case: 'https://photo.jpg', value: 'https://photo.jpg', expected: 'https://photo.jpg' },
  { prop: 'photo', case: 'undefined', value: undefined, expected: photo },
]

export const propIconTestCases: TPropTestCase<IAltNgFieldAvatarProps, 'icon'>[] = [
  { prop: 'icon', case: 'icon', value: altSearch, expected: altSearch },
  { prop: 'icon', case: 'undefined', value: undefined, expected: icon },
]
