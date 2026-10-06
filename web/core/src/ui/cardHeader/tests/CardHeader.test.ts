import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import { getWCShadowRoot } from '~shared/tests/utils'
import {
  YCoreCardHeaderTagName as tagName,
  YCoreIconTagName,
  YCoreTagTagName,
} from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { createCoreCardHeaderProps } from '~core/ui/cardHeader/models/types'
import '~core/ui/cardHeader'

import {
  propDisabledCases,
  propSizeCases,
  propHeaderTextCases,
  propTagTextCases,
  propTagVariantCases,
  propHeaderIconCases,
} from './cases/props'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreCardHeaderProps(),
)

describe(
  'Core/YCardHeader/Unit',
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
      'Props',
      () => {
        for (const testCase of [
          ...propDisabledCases,
          ...propSizeCases,
          ...propHeaderTextCases,
          ...propTagTextCases,
          ...propTagVariantCases,
          ...propHeaderIconCases,
        ]) {
          it(
            `Prop "${testCase.prop}" должен быть ${testCase.case}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              expect(component[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const testCase of propHeaderTextCases) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} ${testCase.value ? 'должен' : 'не должен'} рендерить заголовок`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const shadowRoot = getWCShadowRoot(component)
              const titleElement = shadowRoot.querySelector('.y-core-card-header__title')

              expect(titleElement?.textContent?.trim()).toBe(testCase.value || undefined)
            },
          )
        }

        for (const testCase of propTagTextCases) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} ${testCase.value ? 'должен' : 'не должен'} рендерить тег`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const shadowRoot = getWCShadowRoot(component)
              const tagElement = shadowRoot.querySelector(YCoreTagTagName)

              if (testCase.value) {
                expect(tagElement).not.toBeNull()
              } else {
                expect(tagElement).toBeNull()
              }
            },
          )
        }

        for (const testCase of propHeaderIconCases) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} ${testCase.value ? 'должен' : 'не должен'} рендерить иконку`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const shadowRoot = getWCShadowRoot(component)
              const iconElement = shadowRoot.querySelector(YCoreIconTagName)

              if (testCase.value) {
                expect(iconElement).not.toBeNull()
              } else {
                expect(iconElement).toBeNull()
              }
            },
          )
        }
      },
    )
  },
)
