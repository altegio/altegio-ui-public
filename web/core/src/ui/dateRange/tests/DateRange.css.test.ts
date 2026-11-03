import { beforeAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { AltCoreDateRangeTagName as tagName } from '~shared/constants'
import '~core/ui/dateRange'
import { createCoreDateRangeProps } from '~core/ui/dateRange/models/types'

const {
  component,
  injectComponentToBody,
} = useCoreTests(
  tagName,
  createCoreDateRangeProps(),
)

describe(
  'Core/AltCoreDateRange/CSS',
  () => {
    beforeAll(() => {
      injectComponentToBody()
    })

    it(
      'Should be a block by default',
      () => {
        expect(getComputedStyle(component).getPropertyValue('--alt-core-date-range-display').trim()).toBe('block')
        expect(getComputedStyle(component).display).toBe('block')
      },
    )
  },
)
