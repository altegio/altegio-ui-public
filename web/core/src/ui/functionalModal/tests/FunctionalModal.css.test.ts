import { beforeAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot, getHostCSSVariableValue } from '~shared/tests/utils'
import { YCoreFunctionalModalTagName as tagName } from '~shared/constants'
import '~core/ui/functionalModal'
import {
  CSSVariablesHostToRootCases,
  CSSVariablesHostToValueCases,
} from './cases/css'
import { createCoreFunctionalModalProps } from '~core/ui/functionalModal/models/types'

const {
  component,
  injectComponentToBody,
} = useCoreTests(
  tagName,
  createCoreFunctionalModalProps(),
)

describe('Core/YCoreFunctionalModal/CSS', () => {
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
        expect(hostCSSVariableValue).toBe(root)
      },
    )
  }

  for (const { host, value } of CSSVariablesHostToValueCases) {
    it(
      `Вычисленная Host CSS переменная ${host} в созданном компоненте должна иметь значение из токенов: ${value}`,
      () => {
        const shadowRoot = getWCShadowRoot(component)
        const varValue = getComputedStyle(shadowRoot.host).getPropertyValue(host).trim()
        expect(varValue).toBe(value)
      },
    )
  }
})
