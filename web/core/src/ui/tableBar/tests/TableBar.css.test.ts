import { beforeAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot, getHostCSSVariableValue } from '~shared/tests/utils'

import { YCoreTableBarTagName } from '~shared/constants'
import {
  createCoreTableBarProps,
} from '~core/ui/tableBar/models/types'
import '~core/ui/tableBar'
import {
  CSSVariablesHostToRootCases,
  CSSVariablesHostToValueCases,
} from '~core/ui/tableBar/tests/cases/css'

const tagName = YCoreTableBarTagName

const {
  component,
  injectComponentToBody,
} = useCoreTests(
  tagName,
  createCoreTableBarProps(),
)

describe(
  'Core/YCoreTableBar/CSS',
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
