import type { TPropTestCase } from '~shared/types/tests'
import type { IYNgEmptyStateProps } from '~ng/ui/emptyState/models/types'
import { yMagic, yRocket } from '~shared/icons'
import { empty, text } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'

export const propSizeTestCases: TPropTestCase<IYNgEmptyStateProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: EYSizes.SMALL },
]
export const propTitleTestCases: TPropTestCase<IYNgEmptyStateProps, 'title'>[] = [
  { prop: 'title', case: 'с контентом', value: text, expected: text },
  { prop: 'title', case: 'без контента', value: empty, expected: empty },
]
export const propDescriptionTestCases: TPropTestCase<IYNgEmptyStateProps, 'description'>[] = [
  { prop: 'description', case: 'с контентом', value: text, expected: text },
  { prop: 'description', case: 'без контента', value: empty, expected: empty },
]
export const propIconTestCases: TPropTestCase<IYNgEmptyStateProps, 'icon'>[] = [
  { prop: 'icon', case: 'с указанной иконкой', value: yRocket, expected: yRocket.name },
  { prop: 'icon', case: 'со стандартной иконкой', value: undefined, expected: yMagic.name },
]
