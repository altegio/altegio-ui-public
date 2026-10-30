import { generatePropTestCases } from '~shared/tests/utils'
import type { IAltCoreTooltipProps } from '~core/ui/tooltip/models/types'
import { createCoreTooltipProps } from '~core/ui/tooltip/models/types'
import { stringTestValues } from '~shared/tests/mockData'

const defaultProps = createCoreTooltipProps()

export const propTextTestCases = generatePropTestCases<IAltCoreTooltipProps, 'text'>(
  'text',
  stringTestValues,
  defaultProps,
)
