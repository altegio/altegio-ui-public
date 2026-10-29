import { beforeAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot, getHostCSSVariableValue } from '~shared/tests/utils'

import { YCoreLinkTagName } from '~shared/constants'
import {
  createCoreLinkProps,
} from '~core/ui/link/models/types'
import '~core/ui/link'
import {
  CSSVariablesHostToRootCases,
  CSSVariablesHostToValueCases,
  CSSVariablesTextWrapCases,
} from '~core/ui/link/tests/cases/css'

const tagName = YCoreLinkTagName

const {
  component,
  injectComponentToBody,
} = useCoreTests(
  tagName,
  createCoreLinkProps(),
)

describe(
  'Core/YCoreLink/CSS',
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

    for (const { textWrap, variable, value } of CSSVariablesTextWrapCases) {
      it(
        `Computed CSS variable ${variable} with textWrap=${textWrap} should have the value: ${value}`,
        async() => {
          component.textWrap = textWrap
          await component.updateComplete

          const anchorElement = getWCShadowRoot(component).querySelector('a')
          const computedStyle = window.getComputedStyle(anchorElement!)

          expect(computedStyle.getPropertyValue(variable)).toBe(value)
        },
      )
    }
  },
)
