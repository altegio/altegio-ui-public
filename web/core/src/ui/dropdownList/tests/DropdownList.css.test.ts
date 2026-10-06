import { beforeAll, describe, expect, it } from 'vitest'
import { YCoreDropdownListTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  createCoreDropdownListProps,
} from '~core/ui/dropdownList/models/types'
import '~core/ui/dropdownList'
import { getWCShadowRoot, getHostCSSVariableValue } from '~shared/tests/utils'

import {
  CSSVariablesHostToRootCases,
  CSSVariablesHostToValueCases,
} from './cases/css'

const tagName = YCoreDropdownListTagName

const {
  component,
  injectComponentToBody,
} = useCoreTests(
  tagName,
  createCoreDropdownListProps(),
)

describe(
  'Core/YDropdownList/CSS',
  () => {
    beforeAll(() => {
      injectComponentToBody()
    })

    for (const { host, root } of CSSVariablesHostToRootCases) {
      it(
        `Host CSS переменная ${host} в стилях должна иметь значение :root CSS переменной ${root}`,
        () => {
          const shadowRoot = getWCShadowRoot(component)

          const hostCSSVariableValue = getHostCSSVariableValue(
            shadowRoot.adoptedStyleSheets,
            host,
          )

          expect(hostCSSVariableValue).toBe(`var(${root})`)
        },
      )
    }

    for (const { host, value } of CSSVariablesHostToValueCases) {
      it(
        `Вычисленная Host CSS переменная ${host} в созданном компоненте должна иметь значение из токенов: ${value}`,
        () => {
          const shadowRoot = getWCShadowRoot(component)

          const varValue = getComputedStyle(shadowRoot.host).getPropertyValue(host)

          expect(varValue).toBe(value)
        },
      )
    }
  },
)
