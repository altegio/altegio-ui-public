import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'

import { useCoreTests } from '~web/shared/tests/core'
import {
  AltCoreIconTagName,
  AltCoreAvatarTagName,
} from '~web/shared/constants'
import {
  classWithModifier,
  getElementClasses,
  getShadowRootElement,
  getWCShadowRoot,
} from '~web/shared/tests/utils'
import {
  createCoreAvatarExternalProps,
} from '~core/ui/avatar/models/types'
import '~core/ui/avatar'
import {
  propDisabledTestCases,
  propIconTestCases,
  propInitialsTestCases, propPhotoTestCases,
  propSizeTestCases,
} from '~core/ui/avatar/tests/cases/props'

const tagName = AltCoreAvatarTagName

type TSubComponent = typeof AltCoreIconTagName

const getSubWC = <T extends TSubComponent>(primaryWC: HTMLElement, secondaryWC: T) => {
  const subWC = getWCShadowRoot(primaryWC).querySelector(secondaryWC)
  if (!subWC) throw new Error(`${secondaryWC} not found`)
  return subWC
}

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreAvatarExternalProps(),
)

const localClassWithModifier = (modifier: string) => classWithModifier(
  tagName,
  modifier,
)

const localClassWithElement = (element: string) => `${tagName}__${element}`

const getRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

describe(
  'Core/AltCoreAvatar',
  () => {
    beforeAll(() => {
      injectComponentToBody()
    })

    afterEach(async() => {
      await resetComponent()
    })

    afterAll(() => {
      removeComponent()
    })

    describe(
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            for (const testCase of propSizeTestCases) {
              const expectedCssClass = localClassWithModifier(`${testCase.prop}_${testCase.case}`)

              it(
                `Prop "${testCase.prop}" should change the rootElement class to "${expectedCssClass}"`,
                async() => {
                  await updateComponent({ props: { [testCase.prop]: testCase.value } })

                  const rootElement = getRootElement()
                  const rootElementClasses = getElementClasses(rootElement)

                  expect(rootElementClasses).toContain(expectedCssClass)
                },
              )
            }

            for (const testCase of propDisabledTestCases) {
              const expectedCssClass = localClassWithModifier('disabled')

              it(
                `Should ${testCase.case} the disabled class when prop disabled is ${testCase.value}`,
                async() => {
                  await updateComponent({ props: { disabled: testCase.value } })

                  const rootElement = getRootElement()
                  const rootElementClasses = getElementClasses(rootElement)

                  if (testCase.value) {
                    expect(rootElementClasses).toContain(expectedCssClass)
                  } else {
                    expect(rootElementClasses).not.toContain(expectedCssClass)
                  }
                },
              )
            }

            for (const { prop, case: propCase, value } of propIconTestCases) {
              it(
                `Prop "${prop}" should be "${propCase}" and passed to quark/icon`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  if (value) {
                    const iconElement = getSubWC(
                      component,
                      AltCoreIconTagName,
                    )
                    expect(iconElement.icon).toBe(value)
                  } else {
                    expect(() => getSubWC(
                      component,
                      AltCoreIconTagName,
                    )).toThrow(`${AltCoreIconTagName} not found`)
                  }
                },
              )
            }

            for (const { prop, case: propCase, value, expected } of [
              ...propInitialsTestCases,
              ...propPhotoTestCases,
            ]) {
              const classWithElement = localClassWithElement(String(expected))

              it(
                `${value ? 'Should' : 'Should not'} add node ${classWithElement} when prop ${prop} is "${propCase}"`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  const rootElement = getShadowRootElement(component, classWithElement)

                  if (value) {
                    expect(rootElement).not.toBeNull()
                  } else {
                    expect(rootElement).toBeNull()
                  }
                },
              )
            }
          },
        )
      },
    )
  },
)
