import { generatePropTestCases } from '~shared/tests/utils'
import type { IYCoreTooltipProps } from '~core/ui/tooltip/models/types'
import { createCoreTooltipProps } from '~core/ui/tooltip/models/types'
import { stringTestValues } from '~shared/tests/mockData'

const defaultProps = createCoreTooltipProps()

export const propTextTestCases = generatePropTestCases<IYCoreTooltipProps, 'text'>(
  'text',
  stringTestValues,
  defaultProps,
)
