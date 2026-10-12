import { text } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'
import type { IYVueFieldAvatarProps } from '~vue/ui/fieldAvatar/models/types'
import { createVueFieldAvatarProps } from '~vue/ui/fieldAvatar/models/types'
import type { TPropTestCase } from '~shared/types/tests'
import { ySearch } from '~shared/icons'

const {
  disabled,
  size,
  initials,
  photo,
  icon,
} = createVueFieldAvatarProps()

export const propDisabledTestCases: TPropTestCase<IYVueFieldAvatarProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]

export const propSizeTestCases: TPropTestCase<IYVueFieldAvatarProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]

export const propInitialsTestCases: TPropTestCase<IYVueFieldAvatarProps, 'initials'>[] = [
  { prop: 'initials', case: text, value: text, expected: text },
  { prop: 'initials', case: 'undefined', value: undefined, expected: initials },
]

export const propPhotoTestCases: TPropTestCase<IYVueFieldAvatarProps, 'photo'>[] = [
  { prop: 'photo', case: 'https://photo.jpg', value: 'https://photo.jpg', expected: 'https://photo.jpg' },
  { prop: 'photo', case: 'undefined', value: undefined, expected: photo },
]

export const propIconTestCases: TPropTestCase<IYVueFieldAvatarProps, 'icon'>[] = [
  { prop: 'icon', case: 'icon', value: ySearch, expected: ySearch },
  { prop: 'icon', case: 'undefined', value: undefined, expected: icon },
]
