import type { TPropTestCase } from '~shared/types/tests'
import type { IYCoreEmptyStateExternalProps } from '~core/ui/emptyState/models/types/external'
import { empty, text } from '~shared/tests/slotContents'
import { yMagic, yRocket } from '~shared/icons'
import { EYSizes } from '~shared/types/global'

export const defaultTestProps = {
  title: 'Test title',
  description: 'Test description',
}

export const propSizeTestCases: TPropTestCase<IYCoreEmptyStateExternalProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: EYSizes.SMALL },
]
export const propTitleTestCases: TPropTestCase<IYCoreEmptyStateExternalProps, 'title'>[] = [
  { prop: 'title', case: 'с контентом', value: text, expected: text },
  { prop: 'title', case: 'без контента', value: empty, expected: empty },
]
export const propDescriptionTestCases: TPropTestCase<IYCoreEmptyStateExternalProps, 'description'>[] = [
  { prop: 'description', case: 'с контентом', value: text, expected: text },
  { prop: 'description', case: 'без контента', value: empty, expected: empty },
]
export const propIconTestCases: TPropTestCase<IYCoreEmptyStateExternalProps, 'icon'>[] = [
  { prop: 'icon', case: 'с указанной иконкой', value: yRocket, expected: yRocket.name },
  { prop: 'icon', case: 'со стандартной иконкой', value: undefined, expected: yMagic.name },
]
