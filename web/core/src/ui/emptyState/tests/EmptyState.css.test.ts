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
