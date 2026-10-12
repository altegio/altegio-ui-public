import { beforeAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot, getHostCSSVariableValue } from '~shared/tests/utils'

import { YCoreBrandButtonTagName as tagName } from '~shared/constants'
import '~core/ui/brandButton'

import {
  CSSVariablesHostToRootCases,
  CSSVariablesHostToValueCases,
} from './cases/css'
import { createCoreBrandButtonProps, EYCoreBrandButtonVariant } from '~core/ui/brandButton/models/types'

const {
  component,
  injectComponentToBody,
} = useCoreTests(
  tagName,
  {
    ...createCoreBrandButtonProps(),
    variant: EYCoreBrandButtonVariant.WhatsApp,
  },
)

describe('Core/YCoreBrandButton/CSS', () => {
  beforeAll(() => {
    injectComponentToBody()
  })

  for (const { host, root } of CSSVariablesHostToRootCases) {
    it(`Host CSS переменная ${host} должна ссылаться на root CSS переменную ${root}`, () => {
      const brandButtonShadow = getWCShadowRoot(component)

      const hostCSSVariableValue = getHostCSSVariableValue(
        brandButtonShadow.adoptedStyleSheets,
        host,
        ':host([data-variant="whatsapp"])',
      )

      expect(hostCSSVariableValue).toBe(`var(${root})`)
    })
  }

  for (const { host, value } of CSSVariablesHostToValueCases) {
    it(`Вычисленная Host CSS переменная ${host} должна быть равна ${value}`, () => {
      const brandButtonShadow = getWCShadowRoot(component)
      const simpleButton = brandButtonShadow.querySelector('y-core-simple-button')!
      const simpleButtonShadow = getWCShadowRoot(simpleButton)

      const varValue = getComputedStyle(simpleButtonShadow.host).getPropertyValue(host).trim()

      expect(varValue).toBe(value)
    })
  }
})
