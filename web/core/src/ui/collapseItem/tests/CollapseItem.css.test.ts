import { beforeAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot, getHostCSSVariableValue } from '~shared/tests/utils'

import { YCoreCollapseItemTagName } from '~shared/constants'
import {
  createCoreCollapseItemProps,
} from '~core/ui/collapseItem/models/types'
import '~core/ui/collapseItem'
import {
  CSSVariablesHostToRootCases,
  CSSVariablesHostToValueCases,
} from '~core/ui/collapseItem/tests/cases/css'

const tagName = YCoreCollapseItemTagName

const {
  component,
  injectComponentToBody,
} = useCoreTests(
  tagName,
  createCoreCollapseItemProps(),
)

describe(
  'Core/YCoreCollapseItem/CSS',
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
