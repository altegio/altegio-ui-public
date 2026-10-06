import { beforeAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { getHostCSSVariableValue, getWCShadowRoot } from '~shared/tests/utils'

import { YCorePhoneCodeTagName } from '~shared/constants'
import { createCorePhoneCodeExternalProps } from '~core/ui/phoneCode/models/types'
import '~core/ui/phoneCode'
import { CSSVariablesHostToRootCases, CSSVariablesHostToValueCases } from '~core/ui/phoneCode/tests/cases/css'

const {
  component,
  injectComponentToBody,
} = useCoreTests(
  YCorePhoneCodeTagName,
  createCorePhoneCodeExternalProps(),
)

describe('Core/YCorePhoneCode/CSS', () => {
  beforeAll(() => {
    injectComponentToBody()
  })

  for (const { host, root } of CSSVariablesHostToRootCases) {
    it(`Host CSS переменная ${host} в стилях должна иметь значение :root CSS переменной ${root}`, () => {
      const shadowRoot = getWCShadowRoot(component)

      const hostCSSVariableValue = getHostCSSVariableValue(
        shadowRoot.adoptedStyleSheets,
        host,
      )

      expect(hostCSSVariableValue).toBe(`var(${root})`)
    })
  }

  for (const { host, value } of CSSVariablesHostToValueCases) {
    it(`Вычисленная Host CSS переменная ${host} в созданном компоненте должна иметь значение из токенов: ${value}`, () => {
      const shadowRoot = getWCShadowRoot(component)

      const varValue = getComputedStyle(shadowRoot.host).getPropertyValue(host)

      expect(varValue).toBe(value)
    })
  }
})
