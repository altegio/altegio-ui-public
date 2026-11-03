import { beforeAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot, getHostCSSVariableValue } from '~shared/tests/utils'
import { AltCoreBannerTagName } from '~shared/constants'
import '~core/ui/banner'
import { createCoreBannerProps } from '~core/ui/banner/models/types'
import { CSSVariablesHostToRootCases, CSSVariablesHostToValueCases } from '~core/ui/banner/tests/cases/css'

const tagName = AltCoreBannerTagName

const {
  component,
  injectComponentToBody,
} = useCoreTests(
  tagName,
  createCoreBannerProps(),
)

describe(
  'Core/AltCoreBanner/CSS',
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
