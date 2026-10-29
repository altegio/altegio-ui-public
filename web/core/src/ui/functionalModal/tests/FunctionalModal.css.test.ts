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
      `Host CSS variable ${host} should have the value of the :root CSS variable ${root} in the styles`,
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
      `Computed host CSS variable ${host} on the created component should have the token value: ${value}`,
      () => {
        const shadowRoot = getWCShadowRoot(component)
        const varValue = getComputedStyle(shadowRoot.host).getPropertyValue(host).trim()
        expect(varValue).toBe(value)
      },
    )
  }
})
