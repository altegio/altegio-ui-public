import { beforeAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot, getHostCSSVariableValue } from '~shared/tests/utils'

import { AltCoreButtonTagName } from '~shared/constants'
import {
  createCoreButtonProps,
} from '~core/ui/button/models/types'
import '~core/ui/button'
import {
  CSSVariablesDisabledCases,
  CSSVariablesDisabledValueCases,
  CSSVariablesPrimaryVariantCases,
  CSSVariablesPrimaryVariantValueCases,
  CSSVariablesOutlineVariantCases,
  CSSVariablesOutlineVariantValueCases,
} from '~core/ui/button/tests/cases/css'

const tagName = AltCoreButtonTagName

const {
  component,
  injectComponentToBody,
} = useCoreTests(
  tagName,
  createCoreButtonProps(),
)

describe(
  'Core/AltCoreButton/CSS/Disabled',
  () => {
    beforeAll(() => {
      injectComponentToBody()
    })

    for (const { host, root } of CSSVariablesDisabledCases) {
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

    for (const { host, value } of CSSVariablesDisabledValueCases) {
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

describe(
  'Core/AltCoreButton/CSS/Primary Variant',
  () => {
    let primaryComponent: HTMLElement

    beforeAll(() => {
      primaryComponent = document.createElement(tagName)
      primaryComponent.setAttribute('variant', 'primary')
      document.body.appendChild(primaryComponent)
    })

    for (const { host, root } of CSSVariablesPrimaryVariantCases) {
      it(
        `Host CSS variable ${host} for variant="primary" should have the value of the :root CSS variable ${root}`,
        () => {
          const shadowRoot = getWCShadowRoot(primaryComponent)

          const hostCSSVariableValue = getHostCSSVariableValue(
            shadowRoot.adoptedStyleSheets,
            host,
            ':host([variant="primary"])',
          )

          expect(hostCSSVariableValue).toBe(`var(${root})`)
        },
      )
    }

    for (const { host, value } of CSSVariablesPrimaryVariantValueCases) {
      it(
        `Computed host CSS variable ${host} for variant="primary" should have the token value: ${value}`,
        () => {
          const shadowRoot = getWCShadowRoot(primaryComponent)

          const varValue = getComputedStyle(shadowRoot.host).getPropertyValue(host)

          expect(varValue).toBe(value)
        },
      )
    }
  },
)

describe(
  'Core/AltCoreButton/CSS/Outline Variants',
  () => {
    let outlineComponent: HTMLElement

    beforeAll(() => {
      outlineComponent = document.createElement(tagName)
      outlineComponent.setAttribute('variant', 'outline')
      document.body.appendChild(outlineComponent)
    })

    for (const { host, root } of CSSVariablesOutlineVariantCases) {
      it(
        `Host CSS variable ${host} for variant="outline" should have the value of the :root CSS variable ${root}`,
        () => {
          const shadowRoot = getWCShadowRoot(outlineComponent)

          const hostCSSVariableValue = getHostCSSVariableValue(
            shadowRoot.adoptedStyleSheets,
            host,
            ':host([variant="outline"])',
          )

          expect(hostCSSVariableValue).toBe(`var(${root})`)
        },
      )
    }

    for (const { host, value } of CSSVariablesOutlineVariantValueCases) {
      it(
        `Computed host CSS variable ${host} for variant="outline" should have the token value: ${value}`,
        () => {
          const shadowRoot = getWCShadowRoot(outlineComponent)

          const varValue = getComputedStyle(shadowRoot.host).getPropertyValue(host)

          expect(varValue).toBe(value)
        },
      )
    }
  },
)

describe(
  'Core/AltCoreButton/CSS/Outline-Filled Variant',
  () => {
    let outlineFilledComponent: HTMLElement

    beforeAll(() => {
      outlineFilledComponent = document.createElement(tagName)
      outlineFilledComponent.setAttribute('variant', 'outline-filled')
      document.body.appendChild(outlineFilledComponent)
    })

    for (const { host, root } of CSSVariablesOutlineVariantCases) {
      it(
        `Host CSS variable ${host} for variant="outline-filled" should have the value of the :root CSS variable ${root}`,
        () => {
          const shadowRoot = getWCShadowRoot(outlineFilledComponent)

          const hostCSSVariableValue = getHostCSSVariableValue(
            shadowRoot.adoptedStyleSheets,
            host,
            ':host([variant="outline-filled"])',
          )

          expect(hostCSSVariableValue).toBe(`var(${root})`)
        },
      )
    }

    for (const { host, value } of CSSVariablesOutlineVariantValueCases) {
      it(
        `Computed host CSS variable ${host} for variant="outline-filled" should have the token value: ${value}`,
        () => {
          const shadowRoot = getWCShadowRoot(outlineFilledComponent)

          const varValue = getComputedStyle(shadowRoot.host).getPropertyValue(host)

          expect(varValue).toBe(value)
        },
      )
    }
  },
)
