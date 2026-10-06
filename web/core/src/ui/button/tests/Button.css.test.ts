import { beforeAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot, getHostCSSVariableValue } from '~shared/tests/utils'

import { YCoreButtonTagName } from '~shared/constants'
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

const tagName = YCoreButtonTagName

const {
  component,
  injectComponentToBody,
} = useCoreTests(
  tagName,
  createCoreButtonProps(),
)

describe(
  'Core/YCoreButton/CSS/Disabled',
  () => {
    beforeAll(() => {
      injectComponentToBody()
    })

    for (const { host, root } of CSSVariablesDisabledCases) {
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

    for (const { host, value } of CSSVariablesDisabledValueCases) {
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

describe(
  'Core/YCoreButton/CSS/Primary Variant',
  () => {
    let primaryComponent: HTMLElement

    beforeAll(() => {
      primaryComponent = document.createElement(tagName)
      primaryComponent.setAttribute('variant', 'primary')
      document.body.appendChild(primaryComponent)
    })

    for (const { host, root } of CSSVariablesPrimaryVariantCases) {
      it(
        `Host CSS переменная ${host} для variant="primary" должна иметь значение :root CSS переменной ${root}`,
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
        `Вычисленная Host CSS переменная ${host} для variant="primary" должна иметь значение из токенов: ${value}`,
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
  'Core/YCoreButton/CSS/Outline Variants',
  () => {
    let outlineComponent: HTMLElement

    beforeAll(() => {
      outlineComponent = document.createElement(tagName)
      outlineComponent.setAttribute('variant', 'outline')
      document.body.appendChild(outlineComponent)
    })

    for (const { host, root } of CSSVariablesOutlineVariantCases) {
      it(
        `Host CSS переменная ${host} для variant="outline" должна иметь значение :root CSS переменной ${root}`,
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
        `Вычисленная Host CSS переменная ${host} для variant="outline" должна иметь значение из токенов: ${value}`,
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
  'Core/YCoreButton/CSS/Outline-Filled Variant',
  () => {
    let outlineFilledComponent: HTMLElement

    beforeAll(() => {
      outlineFilledComponent = document.createElement(tagName)
      outlineFilledComponent.setAttribute('variant', 'outline-filled')
      document.body.appendChild(outlineFilledComponent)
    })

    for (const { host, root } of CSSVariablesOutlineVariantCases) {
      it(
        `Host CSS переменная ${host} для variant="outline-filled" должна иметь значение :root CSS переменной ${root}`,
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
        `Вычисленная Host CSS переменная ${host} для variant="outline-filled" должна иметь значение из токенов: ${value}`,
        () => {
          const shadowRoot = getWCShadowRoot(outlineFilledComponent)

          const varValue = getComputedStyle(shadowRoot.host).getPropertyValue(host)

          expect(varValue).toBe(value)
        },
      )
    }
  },
)
