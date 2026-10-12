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

    for (const { textWrap, variable, value } of CSSVariablesTextWrapCases) {
      it(
        `Вычисленная CSS переменная ${variable} при textWrap=${textWrap} должна иметь значение: ${value}`,
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
