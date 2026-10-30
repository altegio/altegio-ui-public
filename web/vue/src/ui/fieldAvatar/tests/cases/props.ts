import { text } from '~shared/tests/slotContents'
import { EAltSizes } from '~shared/types/global'
import type { IAltVueFieldAvatarProps } from '~vue/ui/fieldAvatar/models/types'
import { createVueFieldAvatarProps } from '~vue/ui/fieldAvatar/models/types'
import type { TPropTestCase } from '~shared/types/tests'
import { altSearch } from '~shared/icons'

const {
  disabled,
  size,
  initials,
  photo,
  icon,
} = createVueFieldAvatarProps()

export const propDisabledTestCases: TPropTestCase<IAltVueFieldAvatarProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]

export const propSizeTestCases: TPropTestCase<IAltVueFieldAvatarProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]

export const propInitialsTestCases: TPropTestCase<IAltVueFieldAvatarProps, 'initials'>[] = [
  { prop: 'initials', case: text, value: text, expected: text },
  { prop: 'initials', case: 'undefined', value: undefined, expected: initials },
]

export const propPhotoTestCases: TPropTestCase<IAltVueFieldAvatarProps, 'photo'>[] = [
  { prop: 'photo', case: 'https://photo.jpg', value: 'https://photo.jpg', expected: 'https://photo.jpg' },
  { prop: 'photo', case: 'undefined', value: undefined, expected: photo },
]

export const propIconTestCases: TPropTestCase<IAltVueFieldAvatarProps, 'icon'>[] = [
  { prop: 'icon', case: 'icon', value: altSearch, expected: altSearch },
  { prop: 'icon', case: 'undefined', value: undefined, expected: icon },
]
