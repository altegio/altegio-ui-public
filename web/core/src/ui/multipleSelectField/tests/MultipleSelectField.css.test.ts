import { beforeAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot } from '~shared/tests/utils'

import { YCoreMultipleSelectFieldTagName } from '~shared/constants'
import {
  createCoreMultipleSelectFieldProps,
} from '~core/ui/multipleSelectField/models/types'
import '~core/ui/multipleSelectField'
import {
  CSSVariablesHostToValueCases,
} from '~core/ui/multipleSelectField/tests/cases/css'

const tagName = YCoreMultipleSelectFieldTagName

const {
  component,
  injectComponentToBody,
} = useCoreTests(
  tagName,
  createCoreMultipleSelectFieldProps(),
)

describe(
  'Core/YCoreMultipleSelectField/CSS',
  () => {
    beforeAll(() => {
      injectComponentToBody()
    })

    for (const { host, value } of CSSVariablesHostToValueCases) {
      it(
        `Computed host CSS variable ${host} on the created component should have the token value: ${value}`,
        () => {
          const shadowRoot = getWCShadowRoot(component)

          const varValue = getComputedStyle(shadowRoot.host).getPropertyValue(host)

          expect(varValue).toBe(value)
        },
      )
    }
  },
)
