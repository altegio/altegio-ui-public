import { beforeAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { getHostCSSVariableValue, getWCShadowRoot } from '~shared/tests/utils'

import { YCoreFieldIconTagName } from '~shared/constants'
import { createCoreFieldIconExternalProps } from '~core/ui/fieldIcon/models/types/external'

import '~core/ui/fieldIcon'
import '~core/ui/icon'

import { CSSVariablesHostToRootCases, CSSVariablesHostToValueCases } from '~core/ui/fieldIcon/tests/cases/css'
import { yMagic } from '~shared/icons'

const {
  component,
  injectComponentToBody,
} = useCoreTests(
  YCoreFieldIconTagName,
  { ...createCoreFieldIconExternalProps(), icon: yMagic },
)

describe(
  'Core/YCoreFieldIcon/CSS',
  () => {
    beforeAll(() => {
      component.icon = yMagic
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
