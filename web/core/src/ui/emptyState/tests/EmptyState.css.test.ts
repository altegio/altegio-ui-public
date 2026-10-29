import { beforeAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot, getHostCSSVariableValue } from '~shared/tests/utils'
import { YCoreEmptyStateTagName } from '~shared/constants'
import '~core/ui/emptyState'
import { createCoreEmptyStateExternalProps } from '~core/ui/emptyState/models/types/external'
import { CSSVariablesHostToRootCases, CSSVariablesHostToValueCases } from '~core/ui/emptyState/tests/cases/css'

const tagName = YCoreEmptyStateTagName

const {
  component,
  injectComponentToBody,
} = useCoreTests(
  tagName,
  createCoreEmptyStateExternalProps(),
)

describe(
  'Core/YCoreEmptyState/CSS',
  () => {
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

          expect(hostCSSVariableValue).toBe(`var(${root})`)
        },
      )
    }

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
