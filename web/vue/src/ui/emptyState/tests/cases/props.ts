import type { TPropTestCase } from '~shared/types/tests'
import type { IAltCoreEmptyStateExternalProps } from '~core/ui/emptyState/models/types/external'
import { empty, text } from '~shared/tests/slotContents'
import { altMagic, altRocket } from '~shared/icons'
import { EAltSizes } from '~shared/types/global'

export const defaultTestProps = {
  title: 'Test title',
  description: 'Test description',
}

export const propSizeTestCases: TPropTestCase<IAltCoreEmptyStateExternalProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: EAltSizes.SMALL },
]
export const propTitleTestCases: TPropTestCase<IAltCoreEmptyStateExternalProps, 'title'>[] = [
  { prop: 'title', case: 'with content', value: text, expected: text },
  { prop: 'title', case: 'without content', value: empty, expected: empty },
]
export const propDescriptionTestCases: TPropTestCase<IAltCoreEmptyStateExternalProps, 'description'>[] = [
  { prop: 'description', case: 'with content', value: text, expected: text },
  { prop: 'description', case: 'without content', value: empty, expected: empty },
]
export const propIconTestCases: TPropTestCase<IAltCoreEmptyStateExternalProps, 'icon'>[] = [
  { prop: 'icon', case: 'with the given icon', value: altRocket, expected: altRocket.name },
  { prop: 'icon', case: 'with the default icon', value: undefined, expected: altMagic.name },
]
