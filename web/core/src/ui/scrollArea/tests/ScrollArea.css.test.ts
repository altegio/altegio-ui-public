import { beforeAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot, getHostCSSVariableValue } from '~shared/tests/utils'
import { AltCoreScrollAreaTagName } from '~shared/constants'
import '~core/ui/scrollArea'
import { createCoreScrollAreaProps } from '~core/ui/scrollArea/models/types'
import { CSSVariablesHostToRootCases, CSSVariablesHostToValueCases } from '~core/ui/scrollArea/tests/cases/css'

const tagName = AltCoreScrollAreaTagName

const {
  component,
  injectComponentToBody,
} = useCoreTests(
  tagName,
  createCoreScrollAreaProps(),
)

describe(
  'Core/AltCoreScrollArea/CSS',
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
